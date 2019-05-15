import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';
import { HeavyPlateFinishedService } from './heavy-plate-finished.service';
import { HeavyPlateFinishedComponent } from './heavy-plate-finished.component';
import { HeavyPlateFinishedDetailComponent } from './heavy-plate-finished-detail.component';
import { HeavyPlateFinishedUpdateComponent } from './heavy-plate-finished-update.component';
import { HeavyPlateFinishedDeletePopupComponent } from './heavy-plate-finished-delete-dialog.component';
import { IHeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';

@Injectable({ providedIn: 'root' })
export class HeavyPlateFinishedResolve implements Resolve<IHeavyPlateFinished> {
  constructor(private service: HeavyPlateFinishedService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHeavyPlateFinished> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HeavyPlateFinished>) => response.ok),
        map((heavyPlateFinished: HttpResponse<HeavyPlateFinished>) => heavyPlateFinished.body)
      );
    }
    return of(new HeavyPlateFinished());
  }
}

export const heavyPlateFinishedRoute: Routes = [
  {
    path: '',
    component: HeavyPlateFinishedComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.heavyPlateFinished.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HeavyPlateFinishedDetailComponent,
    resolve: {
      heavyPlateFinished: HeavyPlateFinishedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.heavyPlateFinished.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HeavyPlateFinishedUpdateComponent,
    resolve: {
      heavyPlateFinished: HeavyPlateFinishedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.heavyPlateFinished.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HeavyPlateFinishedUpdateComponent,
    resolve: {
      heavyPlateFinished: HeavyPlateFinishedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.heavyPlateFinished.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const heavyPlateFinishedPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HeavyPlateFinishedDeletePopupComponent,
    resolve: {
      heavyPlateFinished: HeavyPlateFinishedResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.heavyPlateFinished.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
