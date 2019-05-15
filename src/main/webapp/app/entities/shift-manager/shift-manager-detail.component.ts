import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShiftManager } from 'app/shared/model/shift-manager.model';

@Component({
  selector: 'jhi-shift-manager-detail',
  templateUrl: './shift-manager-detail.component.html'
})
export class ShiftManagerDetailComponent implements OnInit {
  shiftManager: IShiftManager;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shiftManager }) => {
      this.shiftManager = shiftManager;
    });
  }

  previousState() {
    window.history.back();
  }
}
