import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';

@Component({
  selector: 'jhi-heavy-plate-finished-detail',
  templateUrl: './heavy-plate-finished-detail.component.html'
})
export class HeavyPlateFinishedDetailComponent implements OnInit {
  heavyPlateFinished: IHeavyPlateFinished;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ heavyPlateFinished }) => {
      this.heavyPlateFinished = heavyPlateFinished;
    });
  }

  previousState() {
    window.history.back();
  }
}
