import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { INormalising } from 'app/shared/model/normalising.model';
import { AccountService } from 'app/core';
import { NormalisingService } from './normalising.service';

@Component({
  selector: 'jhi-normalising',
  templateUrl: './normalising.component.html'
})
export class NormalisingComponent implements OnInit, OnDestroy {
  normalisings: INormalising[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected normalisingService: NormalisingService,
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
      this.normalisingService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<INormalising[]>) => res.ok),
          map((res: HttpResponse<INormalising[]>) => res.body)
        )
        .subscribe((res: INormalising[]) => (this.normalisings = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.normalisingService
      .query()
      .pipe(
        filter((res: HttpResponse<INormalising[]>) => res.ok),
        map((res: HttpResponse<INormalising[]>) => res.body)
      )
      .subscribe(
        (res: INormalising[]) => {
          this.normalisings = res;
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
    this.registerChangeInNormalisings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: INormalising) {
    return item.id;
  }

  registerChangeInNormalisings() {
    this.eventSubscriber = this.eventManager.subscribe('normalisingListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
