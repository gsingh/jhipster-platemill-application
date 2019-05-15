import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShipping } from 'app/shared/model/shipping.model';
import { AccountService } from 'app/core';
import { ShippingService } from './shipping.service';

@Component({
  selector: 'jhi-shipping',
  templateUrl: './shipping.component.html'
})
export class ShippingComponent implements OnInit, OnDestroy {
  shippings: IShipping[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected shippingService: ShippingService,
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
      this.shippingService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IShipping[]>) => res.ok),
          map((res: HttpResponse<IShipping[]>) => res.body)
        )
        .subscribe((res: IShipping[]) => (this.shippings = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.shippingService
      .query()
      .pipe(
        filter((res: HttpResponse<IShipping[]>) => res.ok),
        map((res: HttpResponse<IShipping[]>) => res.body)
      )
      .subscribe(
        (res: IShipping[]) => {
          this.shippings = res;
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
    this.registerChangeInShippings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IShipping) {
    return item.id;
  }

  registerChangeInShippings() {
    this.eventSubscriber = this.eventManager.subscribe('shippingListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
