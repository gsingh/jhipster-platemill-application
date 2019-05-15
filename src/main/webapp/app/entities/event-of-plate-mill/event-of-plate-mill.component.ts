import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';
import { AccountService } from 'app/core';
import { EventOfPlateMillService } from './event-of-plate-mill.service';

@Component({
  selector: 'jhi-event-of-plate-mill',
  templateUrl: './event-of-plate-mill.component.html'
})
export class EventOfPlateMillComponent implements OnInit, OnDestroy {
  eventOfPlateMills: IEventOfPlateMill[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected eventOfPlateMillService: EventOfPlateMillService,
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
      this.eventOfPlateMillService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IEventOfPlateMill[]>) => res.ok),
          map((res: HttpResponse<IEventOfPlateMill[]>) => res.body)
        )
        .subscribe((res: IEventOfPlateMill[]) => (this.eventOfPlateMills = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.eventOfPlateMillService
      .query()
      .pipe(
        filter((res: HttpResponse<IEventOfPlateMill[]>) => res.ok),
        map((res: HttpResponse<IEventOfPlateMill[]>) => res.body)
      )
      .subscribe(
        (res: IEventOfPlateMill[]) => {
          this.eventOfPlateMills = res;
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
    this.registerChangeInEventOfPlateMills();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEventOfPlateMill) {
    return item.id;
  }

  registerChangeInEventOfPlateMills() {
    this.eventSubscriber = this.eventManager.subscribe('eventOfPlateMillListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
