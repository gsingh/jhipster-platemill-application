import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ShiftManager } from 'app/shared/model/shift-manager.model';
import { ShiftManagerService } from './shift-manager.service';
import { ShiftManagerComponent } from './shift-manager.component';
import { ShiftManagerDetailComponent } from './shift-manager-detail.component';
import { ShiftManagerUpdateComponent } from './shift-manager-update.component';
import { ShiftManagerDeletePopupComponent } from './shift-manager-delete-dialog.component';
import { IShiftManager } from 'app/shared/model/shift-manager.model';

@Injectable({ providedIn: 'root' })
export class ShiftManagerResolve implements Resolve<IShiftManager> {
  constructor(private service: ShiftManagerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IShiftManager> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ShiftManager>) => response.ok),
        map((shiftManager: HttpResponse<ShiftManager>) => shiftManager.body)
      );
    }
    return of(new ShiftManager());
  }
}

export const shiftManagerRoute: Routes = [
  {
    path: '',
    component: ShiftManagerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.shiftManager.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ShiftManagerDetailComponent,
    resolve: {
      shiftManager: ShiftManagerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.shiftManager.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ShiftManagerUpdateComponent,
    resolve: {
      shiftManager: ShiftManagerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.shiftManager.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ShiftManagerUpdateComponent,
    resolve: {
      shiftManager: ShiftManagerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.shiftManager.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const shiftManagerPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ShiftManagerDeletePopupComponent,
    resolve: {
      shiftManager: ShiftManagerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.shiftManager.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
