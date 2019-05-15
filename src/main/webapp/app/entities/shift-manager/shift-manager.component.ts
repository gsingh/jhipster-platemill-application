import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IShiftManager } from 'app/shared/model/shift-manager.model';
import { AccountService } from 'app/core';
import { ShiftManagerService } from './shift-manager.service';

@Component({
  selector: 'jhi-shift-manager',
  templateUrl: './shift-manager.component.html'
})
export class ShiftManagerComponent implements OnInit, OnDestroy {
  shiftManagers: IShiftManager[];
  currentAccount: any;
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected shiftManagerService: ShiftManagerService,
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
      this.shiftManagerService
        .search({
          query: this.currentSearch
        })
        .pipe(
          filter((res: HttpResponse<IShiftManager[]>) => res.ok),
          map((res: HttpResponse<IShiftManager[]>) => res.body)
        )
        .subscribe((res: IShiftManager[]) => (this.shiftManagers = res), (res: HttpErrorResponse) => this.onError(res.message));
      return;
    }
    this.shiftManagerService
      .query()
      .pipe(
        filter((res: HttpResponse<IShiftManager[]>) => res.ok),
        map((res: HttpResponse<IShiftManager[]>) => res.body)
      )
      .subscribe(
        (res: IShiftManager[]) => {
          this.shiftManagers = res;
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
    this.registerChangeInShiftManagers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IShiftManager) {
    return item.id;
  }

  registerChangeInShiftManagers() {
    this.eventSubscriber = this.eventManager.subscribe('shiftManagerListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
