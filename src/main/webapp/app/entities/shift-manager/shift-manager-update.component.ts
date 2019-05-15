import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IShiftManager, ShiftManager } from 'app/shared/model/shift-manager.model';
import { ShiftManagerService } from './shift-manager.service';

@Component({
  selector: 'jhi-shift-manager-update',
  templateUrl: './shift-manager-update.component.html'
})
export class ShiftManagerUpdateComponent implements OnInit {
  shiftManager: IShiftManager;
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    designation: [null, [Validators.required]],
    mobileNumber: [null, [Validators.required]]
  });

  constructor(protected shiftManagerService: ShiftManagerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ shiftManager }) => {
      this.updateForm(shiftManager);
      this.shiftManager = shiftManager;
    });
  }

  updateForm(shiftManager: IShiftManager) {
    this.editForm.patchValue({
      id: shiftManager.id,
      name: shiftManager.name,
      designation: shiftManager.designation,
      mobileNumber: shiftManager.mobileNumber
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const shiftManager = this.createFromForm();
    if (shiftManager.id !== undefined) {
      this.subscribeToSaveResponse(this.shiftManagerService.update(shiftManager));
    } else {
      this.subscribeToSaveResponse(this.shiftManagerService.create(shiftManager));
    }
  }

  private createFromForm(): IShiftManager {
    const entity = {
      ...new ShiftManager(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      designation: this.editForm.get(['designation']).value,
      mobileNumber: this.editForm.get(['mobileNumber']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShiftManager>>) {
    result.subscribe((res: HttpResponse<IShiftManager>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
