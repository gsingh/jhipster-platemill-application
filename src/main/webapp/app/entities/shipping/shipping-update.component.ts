import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IShipping, Shipping } from 'app/shared/model/shipping.model';
import { ShippingService } from './shipping.service';
import { IShiftManager } from 'app/shared/model/shift-manager.model';
import { ShiftManagerService } from 'app/entities/shift-manager';

@Component({
  selector: 'jhi-shipping-update',
  templateUrl: './shipping-update.component.html'
})
export class ShippingUpdateComponent implements OnInit {
  shipping: IShipping;
  isSaving: boolean;

  shiftmanagers: IShiftManager[];
  shippingDateDp: any;

  editForm = this.fb.group({
    id: [],
    shippingDate: [null, [Validators.required]],
    shift: [null, [Validators.required]],
    noOfWagons: [],
    noOfTrailers: [],
    shippedTonnage: [],
    manager: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected shippingService: ShippingService,
    protected shiftManagerService: ShiftManagerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ shipping }) => {
      this.updateForm(shipping);
      this.shipping = shipping;
    });
    this.shiftManagerService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IShiftManager[]>) => mayBeOk.ok),
        map((response: HttpResponse<IShiftManager[]>) => response.body)
      )
      .subscribe((res: IShiftManager[]) => (this.shiftmanagers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(shipping: IShipping) {
    this.editForm.patchValue({
      id: shipping.id,
      shippingDate: shipping.shippingDate,
      shift: shipping.shift,
      noOfWagons: shipping.noOfWagons,
      noOfTrailers: shipping.noOfTrailers,
      shippedTonnage: shipping.shippedTonnage,
      manager: shipping.manager
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const shipping = this.createFromForm();
    if (shipping.id !== undefined) {
      this.subscribeToSaveResponse(this.shippingService.update(shipping));
    } else {
      this.subscribeToSaveResponse(this.shippingService.create(shipping));
    }
  }

  private createFromForm(): IShipping {
    const entity = {
      ...new Shipping(),
      id: this.editForm.get(['id']).value,
      shippingDate: this.editForm.get(['shippingDate']).value,
      shift: this.editForm.get(['shift']).value,
      noOfWagons: this.editForm.get(['noOfWagons']).value,
      noOfTrailers: this.editForm.get(['noOfTrailers']).value,
      shippedTonnage: this.editForm.get(['shippedTonnage']).value,
      manager: this.editForm.get(['manager']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShipping>>) {
    result.subscribe((res: HttpResponse<IShipping>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
