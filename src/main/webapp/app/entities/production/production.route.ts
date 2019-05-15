import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Production } from 'app/shared/model/production.model';
import { ProductionService } from './production.service';
import { ProductionComponent } from './production.component';
import { ProductionDetailComponent } from './production-detail.component';
import { ProductionUpdateComponent } from './production-update.component';
import { ProductionDeletePopupComponent } from './production-delete-dialog.component';
import { IProduction } from 'app/shared/model/production.model';

@Injectable({ providedIn: 'root' })
export class ProductionResolve implements Resolve<IProduction> {
  constructor(private service: ProductionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduction> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Production>) => response.ok),
        map((production: HttpResponse<Production>) => production.body)
      );
    }
    return of(new Production());
  }
}

export const productionRoute: Routes = [
  {
    path: '',
    component: ProductionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.production.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductionDetailComponent,
    resolve: {
      production: ProductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.production.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductionUpdateComponent,
    resolve: {
      production: ProductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.production.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductionUpdateComponent,
    resolve: {
      production: ProductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.production.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const productionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProductionDeletePopupComponent,
    resolve: {
      production: ProductionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.production.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
