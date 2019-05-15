import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPictureOfEvent } from 'app/shared/model/picture-of-event.model';

type EntityResponseType = HttpResponse<IPictureOfEvent>;
type EntityArrayResponseType = HttpResponse<IPictureOfEvent[]>;

@Injectable({ providedIn: 'root' })
export class PictureOfEventService {
  public resourceUrl = SERVER_API_URL + 'api/picture-of-events';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/picture-of-events';

  constructor(protected http: HttpClient) {}

  create(pictureOfEvent: IPictureOfEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pictureOfEvent);
    return this.http
      .post<IPictureOfEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(pictureOfEvent: IPictureOfEvent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(pictureOfEvent);
    return this.http
      .put<IPictureOfEvent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPictureOfEvent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPictureOfEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPictureOfEvent[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(pictureOfEvent: IPictureOfEvent): IPictureOfEvent {
    const copy: IPictureOfEvent = Object.assign({}, pictureOfEvent, {
      picDate: pictureOfEvent.picDate != null && pictureOfEvent.picDate.isValid() ? pictureOfEvent.picDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.picDate = res.body.picDate != null ? moment(res.body.picDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((pictureOfEvent: IPictureOfEvent) => {
        pictureOfEvent.picDate = pictureOfEvent.picDate != null ? moment(pictureOfEvent.picDate) : null;
      });
    }
    return res;
  }
}
