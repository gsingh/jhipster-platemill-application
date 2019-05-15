import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INormalising } from 'app/shared/model/normalising.model';

@Component({
  selector: 'jhi-normalising-detail',
  templateUrl: './normalising-detail.component.html'
})
export class NormalisingDetailComponent implements OnInit {
  normalising: INormalising;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ normalising }) => {
      this.normalising = normalising;
    });
  }

  previousState() {
    window.history.back();
  }
}
