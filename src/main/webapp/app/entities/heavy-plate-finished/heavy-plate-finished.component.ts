import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IHeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';
import { AccountService } from 'app/core';
import { HeavyPlateFinishedService } from './heavy-plate-finished.service';

@Component({
  selector: 'jhi-heavy-plate-finished',
  templateUrl: './heavy-plate-finished.component.html'
})
export class HeavyPlateFinishedComponent implements OnInit, OnDestroy {
  heavyPlateFinisheds: IHeavyPlateFinished[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected heavyPlateFinishedService: HeavyPlateFinishedService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.heavyPlateFinishedService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IHeavyPlateFinished[]>) => res.ok),
          map((res: HttpResponse<IHeavyPlateFinished[]>) => res.body)
        )
        .subscribe((res: IHeavyPlateFinished[]) => (this.heavyPlateFinisheds = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.heavyPlateFinishedService
      .query()
      .pipe(
        filter((res: HttpResponse<IHeavyPlateFinished[]>) => res.ok),
        map((res: HttpResponse<IHeavyPlateFinished[]>) => res.body)
      )
      .subscribe(
        (res: IHeavyPlateFinished[]) => {
          this.heavyPlateFinisheds = res;
          this.currentSearch = '';
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInHeavyPlateFinisheds();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHeavyPlateFinished) {
    return item.id;
  }

  registerChangeInHeavyPlateFinisheds() {
    this.eventSubscriber = this.eventManager.subscribe('heavyPlateFinishedListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
