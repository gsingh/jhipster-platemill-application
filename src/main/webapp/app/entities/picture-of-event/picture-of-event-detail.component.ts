import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPictureOfEvent } from 'app/shared/model/picture-of-event.model';

@Component({
  selector: 'jhi-picture-of-event-detail',
  templateUrl: './picture-of-event-detail.component.html'
})
export class PictureOfEventDetailComponent implements OnInit {
  pictureOfEvent: IPictureOfEvent;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pictureOfEvent }) => {
      this.pictureOfEvent = pictureOfEvent;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
