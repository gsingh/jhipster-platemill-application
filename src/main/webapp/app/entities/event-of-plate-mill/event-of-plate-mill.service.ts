import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

type EntityResponseType = HttpResponse<IEventOfPlateMill>;
type EntityArrayResponseType = HttpResponse<IEventOfPlateMill[]>;

@Injectable({ providedIn: 'root' })
export class EventOfPlateMillService {
  public resourceUrl = SERVER_API_URL + 'api/event-of-plate-mills';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/event-of-plate-mills';

  constructor(protected http: HttpClient) {}

  create(eventOfPlateMill: IEventOfPlateMill): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eventOfPlateMill);
    return this.http
      .post<IEventOfPlateMill>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(eventOfPlateMill: IEventOfPlateMill): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(eventOfPlateMill);
    return this.http
      .put<IEventOfPlateMill>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEventOfPlateMill>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEventOfPlateMill[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEventOfPlateMill[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(eventOfPlateMill: IEventOfPlateMill): IEventOfPlateMill {
    const copy: IEventOfPlateMill = Object.assign({}, eventOfPlateMill, {
      eventDate:
        eventOfPlateMill.eventDate != null && eventOfPlateMill.eventDate.isValid() ? eventOfPlateMill.eventDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.eventDate = res.body.eventDate != null ? moment(res.body.eventDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((eventOfPlateMill: IEventOfPlateMill) => {
        eventOfPlateMill.eventDate = eventOfPlateMill.eventDate != null ? moment(eventOfPlateMill.eventDate) : null;
      });
    }
    return res;
  }
}
