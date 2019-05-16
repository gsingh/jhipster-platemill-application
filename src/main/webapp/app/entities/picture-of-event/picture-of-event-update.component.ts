import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPictureOfEvent, PictureOfEvent } from 'app/shared/model/picture-of-event.model';
import { PictureOfEventService } from './picture-of-event.service';
import { IEventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';
import { EventOfPlateMillService } from 'app/entities/event-of-plate-mill';

@Component({
  selector: 'jhi-picture-of-event-update',
  templateUrl: './picture-of-event-update.component.html'
})
export class PictureOfEventUpdateComponent implements OnInit {
  pictureOfEvent: IPictureOfEvent;
  isSaving: boolean;

  eventofplatemills: IEventOfPlateMill[];
  picDateDp: any;

  editForm = this.fb.group({
    id: [],
    picDate: [],
    imgFile: [null, [Validators.required]],
    imgFileContentType: [],
    eventPM: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected pictureOfEventService: PictureOfEventService,
    protected eventOfPlateMillService: EventOfPlateMillService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pictureOfEvent }) => {
      this.updateForm(pictureOfEvent);
      this.pictureOfEvent = pictureOfEvent;
    });
    this.eventOfPlateMillService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEventOfPlateMill[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEventOfPlateMill[]>) => response.body)
      )
      .subscribe((res: IEventOfPlateMill[]) => (this.eventofplatemills = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pictureOfEvent: IPictureOfEvent) {
    this.editForm.patchValue({
      id: pictureOfEvent.id,
      picDate: pictureOfEvent.picDate,
      imgFile: pictureOfEvent.imgFile,
      imgFileContentType: pictureOfEvent.imgFileContentType,
      eventPM: pictureOfEvent.eventPM
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pictureOfEvent = this.createFromForm();
    if (pictureOfEvent.id !== undefined) {
      this.subscribeToSaveResponse(this.pictureOfEventService.update(pictureOfEvent));
    } else {
      this.subscribeToSaveResponse(this.pictureOfEventService.create(pictureOfEvent));
    }
  }

  private createFromForm(): IPictureOfEvent {
    const entity = {
      ...new PictureOfEvent(),
      id: this.editForm.get(['id']).value,
      picDate: this.editForm.get(['picDate']).value,
      imgFileContentType: this.editForm.get(['imgFileContentType']).value,
      imgFile: this.editForm.get(['imgFile']).value,
      eventPM: this.editForm.get(['eventPM']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPictureOfEvent>>) {
    result.subscribe((res: HttpResponse<IPictureOfEvent>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackEventOfPlateMillById(index: number, item: IEventOfPlateMill) {
    return item.id;
  }
}
