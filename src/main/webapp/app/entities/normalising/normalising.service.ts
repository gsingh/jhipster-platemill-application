import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { INormalising } from 'app/shared/model/normalising.model';

type EntityResponseType = HttpResponse<INormalising>;
type EntityArrayResponseType = HttpResponse<INormalising[]>;

@Injectable({ providedIn: 'root' })
export class NormalisingService {
  public resourceUrl = SERVER_API_URL + 'api/normalisings';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/normalisings';

  constructor(protected http: HttpClient) {}

  create(normalising: INormalising): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(normalising);
    return this.http
      .post<INormalising>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(normalising: INormalising): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(normalising);
    return this.http
      .put<INormalising>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INormalising>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INormalising[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INormalising[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(normalising: INormalising): INormalising {
    const copy: INormalising = Object.assign({}, normalising, {
      normalisingDate:
        normalising.normalisingDate != null && normalising.normalisingDate.isValid()
          ? normalising.normalisingDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.normalisingDate = res.body.normalisingDate != null ? moment(res.body.normalisingDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((normalising: INormalising) => {
        normalising.normalisingDate = normalising.normalisingDate != null ? moment(normalising.normalisingDate) : null;
      });
    }
    return res;
  }
}
