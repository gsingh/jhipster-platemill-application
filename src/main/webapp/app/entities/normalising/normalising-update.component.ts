import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { INormalising, Normalising } from 'app/shared/model/normalising.model';
import { NormalisingService } from './normalising.service';
import { IShiftManager } from 'app/shared/model/shift-manager.model';
import { ShiftManagerService } from 'app/entities/shift-manager';

@Component({
  selector: 'jhi-normalising-update',
  templateUrl: './normalising-update.component.html'
})
export class NormalisingUpdateComponent implements OnInit {
  normalising: INormalising;
  isSaving: boolean;

  shiftmanagers: IShiftManager[];
  normalisingDateDp: any;

  editForm = this.fb.group({
    id: [],
    normalisingDate: [null, [Validators.required]],
    shift: [null, [Validators.required]],
    noOfPlates: [],
    normalisedTonnage: [],
    manager: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected normalisingService: NormalisingService,
    protected shiftManagerService: ShiftManagerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ normalising }) => {
      this.updateForm(normalising);
      this.normalising = normalising;
    });
    this.shiftManagerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IShiftManager[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShiftManager[]>) => response.body)
      )
      .subscribe((res: IShiftManager[]) => (this.shiftmanagers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(normalising: INormalising) {
    this.editForm.patchValue({
      id: normalising.id,
      normalisingDate: normalising.normalisingDate,
      shift: normalising.shift,
      noOfPlates: normalising.noOfPlates,
      normalisedTonnage: normalising.normalisedTonnage,
      manager: normalising.manager
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const normalising = this.createFromForm();
    if (normalising.id !== undefined) {
      this.subscribeToSaveResponse(this.normalisingService.update(normalising));
    } else {
      this.subscribeToSaveResponse(this.normalisingService.create(normalising));
    }
  }

  private createFromForm(): INormalising {
    const entity = {
      ...new Normalising(),
      id: this.editForm.get(['id']).value,
      normalisingDate: this.editForm.get(['normalisingDate']).value,
      shift: this.editForm.get(['shift']).value,
      noOfPlates: this.editForm.get(['noOfPlates']).value,
      normalisedTonnage: this.editForm.get(['normalisedTonnage']).value,
      manager: this.editForm.get(['manager']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INormalising>>) {
    result.subscribe((res: HttpResponse<INormalising>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
