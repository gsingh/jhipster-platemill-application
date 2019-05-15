import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IHeavyPlateFinished, HeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';
import { HeavyPlateFinishedService } from './heavy-plate-finished.service';
import { IShiftManager } from 'app/shared/model/shift-manager.model';
import { ShiftManagerService } from 'app/entities/shift-manager';

@Component({
  selector: 'jhi-heavy-plate-finished-update',
  templateUrl: './heavy-plate-finished-update.component.html'
})
export class HeavyPlateFinishedUpdateComponent implements OnInit {
  heavyPlateFinished: IHeavyPlateFinished;
  isSaving: boolean;

  shiftmanagers: IShiftManager[];
  hPFinishedDateDp: any;

  editForm = this.fb.group({
    id: [],
    hPFinishedDate: [null, [Validators.required]],
    shift: [null, [Validators.required]],
    noOfPlates: [],
    hPFinishedTonnage: [],
    manager: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected heavyPlateFinishedService: HeavyPlateFinishedService,
    protected shiftManagerService: ShiftManagerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ heavyPlateFinished }) => {
      this.updateForm(heavyPlateFinished);
      this.heavyPlateFinished = heavyPlateFinished;
    });
    this.shiftManagerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IShiftManager[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShiftManager[]>) => response.body)
      )
      .subscribe((res: IShiftManager[]) => (this.shiftmanagers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(heavyPlateFinished: IHeavyPlateFinished) {
    this.editForm.patchValue({
      id: heavyPlateFinished.id,
      hPFinishedDate: heavyPlateFinished.hPFinishedDate,
      shift: heavyPlateFinished.shift,
      noOfPlates: heavyPlateFinished.noOfPlates,
      hPFinishedTonnage: heavyPlateFinished.hPFinishedTonnage,
      manager: heavyPlateFinished.manager
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const heavyPlateFinished = this.createFromForm();
    if (heavyPlateFinished.id !== undefined) {
      this.subscribeToSaveResponse(this.heavyPlateFinishedService.update(heavyPlateFinished));
    } else {
      this.subscribeToSaveResponse(this.heavyPlateFinishedService.create(heavyPlateFinished));
    }
  }

  private createFromForm(): IHeavyPlateFinished {
    const entity = {
      ...new HeavyPlateFinished(),
      id: this.editForm.get(['id']).value,
      hPFinishedDate: this.editForm.get(['hPFinishedDate']).value,
      shift: this.editForm.get(['shift']).value,
      noOfPlates: this.editForm.get(['noOfPlates']).value,
      hPFinishedTonnage: this.editForm.get(['hPFinishedTonnage']).value,
      manager: this.editForm.get(['manager']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHeavyPlateFinished>>) {
    result.subscribe((res: HttpResponse<IHeavyPlateFinished>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
