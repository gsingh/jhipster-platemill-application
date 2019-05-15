import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IProduction, Production } from 'app/shared/model/production.model';
import { ProductionService } from './production.service';
import { IShiftManager } from 'app/shared/model/shift-manager.model';
import { ShiftManagerService } from 'app/entities/shift-manager';

@Component({
  selector: 'jhi-production-update',
  templateUrl: './production-update.component.html'
})
export class ProductionUpdateComponent implements OnInit {
  production: IProduction;
  isSaving: boolean;

  shiftmanagers: IShiftManager[];
  prodDateDp: any;

  editForm = this.fb.group({
    id: [],
    prodDate: [null, [Validators.required]],
    shift: [null, [Validators.required]],
    noOfPlates: [],
    prodTonnage: [],
    manager: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productionService: ProductionService,
    protected shiftManagerService: ShiftManagerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ production }) => {
      this.updateForm(production);
      this.production = production;
    });
    this.shiftManagerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IShiftManager[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShiftManager[]>) => response.body)
      )
      .subscribe((res: IShiftManager[]) => (this.shiftmanagers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(production: IProduction) {
    this.editForm.patchValue({
      id: production.id,
      prodDate: production.prodDate,
      shift: production.shift,
      noOfPlates: production.noOfPlates,
      prodTonnage: production.prodTonnage,
      manager: production.manager
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const production = this.createFromForm();
    if (production.id !== undefined) {
      this.subscribeToSaveResponse(this.productionService.update(production));
    } else {
      this.subscribeToSaveResponse(this.productionService.create(production));
    }
  }

  private createFromForm(): IProduction {
    const entity = {
      ...new Production(),
      id: this.editForm.get(['id']).value,
      prodDate: this.editForm.get(['prodDate']).value,
      shift: this.editForm.get(['shift']).value,
      noOfPlates: this.editForm.get(['noOfPlates']).value,
      prodTonnage: this.editForm.get(['prodTonnage']).value,
      manager: this.editForm.get(['manager']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduction>>) {
    result.subscribe((res: HttpResponse<IProduction>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackShiftManagerById(index: number, item: IShiftManager) {
    return item.id;
  }
}
