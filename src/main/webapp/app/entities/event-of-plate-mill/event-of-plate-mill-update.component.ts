import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IEventOfPlateMill, EventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';
import { EventOfPlateMillService } from './event-of-plate-mill.service';

@Component({
  selector: 'jhi-event-of-plate-mill-update',
  templateUrl: './event-of-plate-mill-update.component.html'
})
export class EventOfPlateMillUpdateComponent implements OnInit {
  eventOfPlateMill: IEventOfPlateMill;
  isSaving: boolean;
  eventDateDp: any;

  editForm = this.fb.group({
    id: [],
    eventDate: [null, [Validators.required]],
    eventName: [null, [Validators.required]]
  });

  constructor(
    protected eventOfPlateMillService: EventOfPlateMillService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ eventOfPlateMill }) => {
      this.updateForm(eventOfPlateMill);
      this.eventOfPlateMill = eventOfPlateMill;
    });
  }

  updateForm(eventOfPlateMill: IEventOfPlateMill) {
    this.editForm.patchValue({
      id: eventOfPlateMill.id,
      eventDate: eventOfPlateMill.eventDate,
      eventName: eventOfPlateMill.eventName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const eventOfPlateMill = this.createFromForm();
    if (eventOfPlateMill.id !== undefined) {
      this.subscribeToSaveResponse(this.eventOfPlateMillService.update(eventOfPlateMill));
    } else {
      this.subscribeToSaveResponse(this.eventOfPlateMillService.create(eventOfPlateMill));
    }
  }

  private createFromForm(): IEventOfPlateMill {
    const entity = {
      ...new EventOfPlateMill(),
      id: this.editForm.get(['id']).value,
      eventDate: this.editForm.get(['eventDate']).value,
      eventName: this.editForm.get(['eventName']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEventOfPlateMill>>) {
    result.subscribe((res: HttpResponse<IEventOfPlateMill>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
