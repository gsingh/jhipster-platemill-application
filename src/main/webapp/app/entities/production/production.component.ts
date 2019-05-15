import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProduction } from 'app/shared/model/production.model';
import { AccountService } from 'app/core';
import { ProductionService } from './production.service';

@Component({
  selector: 'jhi-production',
  templateUrl: './production.component.html'
})
export class ProductionComponent implements OnInit, OnDestroy {
  productions: IProduction[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected productionService: ProductionService,
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
      this.productionService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IProduction[]>) => res.ok),
          map((res: HttpResponse<IProduction[]>) => res.body)
        )
        .subscribe((res: IProduction[]) => (this.productions = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.productionService
      .query()
      .pipe(
        filter((res: HttpResponse<IProduction[]>) => res.ok),
        map((res: HttpResponse<IProduction[]>) => res.body)
      )
      .subscribe(
        (res: IProduction[]) => {
          this.productions = res;
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
    this.registerChangeInProductions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProduction) {
    return item.id;
  }

  registerChangeInProductions() {
    this.eventSubscriber = this.eventManager.subscribe('productionListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
