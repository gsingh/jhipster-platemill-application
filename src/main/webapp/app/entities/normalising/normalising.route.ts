import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Normalising } from 'app/shared/model/normalising.model';
import { NormalisingService } from './normalising.service';
import { NormalisingComponent } from './normalising.component';
import { NormalisingDetailComponent } from './normalising-detail.component';
import { NormalisingUpdateComponent } from './normalising-update.component';
import { NormalisingDeletePopupComponent } from './normalising-delete-dialog.component';
import { INormalising } from 'app/shared/model/normalising.model';

@Injectable({ providedIn: 'root' })
export class NormalisingResolve implements Resolve<INormalising> {
  constructor(private service: NormalisingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INormalising> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Normalising>) => response.ok),
        map((normalising: HttpResponse<Normalising>) => normalising.body)
      );
    }
    return of(new Normalising());
  }
}

export const normalisingRoute: Routes = [
  {
    path: '',
    component: NormalisingComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.normalising.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NormalisingDetailComponent,
    resolve: {
      normalising: NormalisingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.normalising.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NormalisingUpdateComponent,
    resolve: {
      normalising: NormalisingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.normalising.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NormalisingUpdateComponent,
    resolve: {
      normalising: NormalisingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.normalising.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const normalisingPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: NormalisingDeletePopupComponent,
    resolve: {
      normalising: NormalisingResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.normalising.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
