import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPictureOfEvent } from 'app/shared/model/picture-of-event.model';
import { AccountService } from 'app/core';
import { PictureOfEventService } from './picture-of-event.service';

@Component({
  selector: 'jhi-picture-of-event',
  templateUrl: './picture-of-event.component.html'
})
export class PictureOfEventComponent implements OnInit, OnDestroy {
  pictureOfEvents: IPictureOfEvent[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected pictureOfEventService: PictureOfEventService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.pictureOfEventService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IPictureOfEvent[]>) => res.ok),
          map((res: HttpResponse<IPictureOfEvent[]>) => res.body)
        )
        .subscribe((res: IPictureOfEvent[]) => (this.pictureOfEvents = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.pictureOfEventService
      .query()
      .pipe(
        filter((res: HttpResponse<IPictureOfEvent[]>) => res.ok),
        map((res: HttpResponse<IPictureOfEvent[]>) => res.body)
      )
      .subscribe(
        (res: IPictureOfEvent[]) => {
          this.pictureOfEvents = res;
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
    this.registerChangeInPictureOfEvents();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPictureOfEvent) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInPictureOfEvents() {
    this.eventSubscriber = this.eventManager.subscribe('pictureOfEventListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
