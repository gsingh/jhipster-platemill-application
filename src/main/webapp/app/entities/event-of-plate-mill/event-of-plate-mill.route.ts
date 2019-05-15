import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';
import { EventOfPlateMillService } from './event-of-plate-mill.service';
import { EventOfPlateMillComponent } from './event-of-plate-mill.component';
import { EventOfPlateMillDetailComponent } from './event-of-plate-mill-detail.component';
import { EventOfPlateMillUpdateComponent } from './event-of-plate-mill-update.component';
import { EventOfPlateMillDeletePopupComponent } from './event-of-plate-mill-delete-dialog.component';
import { IEventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

@Injectable({ providedIn: 'root' })
export class EventOfPlateMillResolve implements Resolve<IEventOfPlateMill> {
  constructor(private service: EventOfPlateMillService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEventOfPlateMill> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EventOfPlateMill>) => response.ok),
        map((eventOfPlateMill: HttpResponse<EventOfPlateMill>) => eventOfPlateMill.body)
      );
    }
    return of(new EventOfPlateMill());
  }
}

export const eventOfPlateMillRoute: Routes = [
  {
    path: '',
    component: EventOfPlateMillComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.eventOfPlateMill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EventOfPlateMillDetailComponent,
    resolve: {
      eventOfPlateMill: EventOfPlateMillResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.eventOfPlateMill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EventOfPlateMillUpdateComponent,
    resolve: {
      eventOfPlateMill: EventOfPlateMillResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.eventOfPlateMill.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EventOfPlateMillUpdateComponent,
    resolve: {
      eventOfPlateMill: EventOfPlateMillResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.eventOfPlateMill.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const eventOfPlateMillPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EventOfPlateMillDeletePopupComponent,
    resolve: {
      eventOfPlateMill: EventOfPlateMillResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.eventOfPlateMill.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
