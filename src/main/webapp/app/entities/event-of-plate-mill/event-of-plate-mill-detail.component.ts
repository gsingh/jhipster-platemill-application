import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

@Component({
  selector: 'jhi-event-of-plate-mill-detail',
  templateUrl: './event-of-plate-mill-detail.component.html'
})
export class EventOfPlateMillDetailComponent implements OnInit {
  eventOfPlateMill: IEventOfPlateMill;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ eventOfPlateMill }) => {
      this.eventOfPlateMill = eventOfPlateMill;
    });
  }

  previousState() {
    window.history.back();
  }
}
