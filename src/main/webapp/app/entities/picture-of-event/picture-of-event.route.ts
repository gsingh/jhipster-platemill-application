import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PictureOfEvent } from 'app/shared/model/picture-of-event.model';
import { PictureOfEventService } from './picture-of-event.service';
import { PictureOfEventComponent } from './picture-of-event.component';
import { PictureOfEventDetailComponent } from './picture-of-event-detail.component';
import { PictureOfEventUpdateComponent } from './picture-of-event-update.component';
import { PictureOfEventDeletePopupComponent } from './picture-of-event-delete-dialog.component';
import { IPictureOfEvent } from 'app/shared/model/picture-of-event.model';

@Injectable({ providedIn: 'root' })
export class PictureOfEventResolve implements Resolve<IPictureOfEvent> {
  constructor(private service: PictureOfEventService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPictureOfEvent> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PictureOfEvent>) => response.ok),
        map((pictureOfEvent: HttpResponse<PictureOfEvent>) => pictureOfEvent.body)
      );
    }
    return of(new PictureOfEvent());
  }
}

export const pictureOfEventRoute: Routes = [
  {
    path: '',
    component: PictureOfEventComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.pictureOfEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PictureOfEventDetailComponent,
    resolve: {
      pictureOfEvent: PictureOfEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.pictureOfEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PictureOfEventUpdateComponent,
    resolve: {
      pictureOfEvent: PictureOfEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.pictureOfEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PictureOfEventUpdateComponent,
    resolve: {
      pictureOfEvent: PictureOfEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.pictureOfEvent.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pictureOfEventPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PictureOfEventDeletePopupComponent,
    resolve: {
      pictureOfEvent: PictureOfEventResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'platemillApp.pictureOfEvent.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
