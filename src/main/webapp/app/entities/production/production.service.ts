import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProduction } from 'app/shared/model/production.model';

type EntityResponseType = HttpResponse<IProduction>;
type EntityArrayResponseType = HttpResponse<IProduction[]>;

@Injectable({ providedIn: 'root' })
export class ProductionService {
  public resourceUrl = SERVER_API_URL + 'api/productions';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/productions';

  constructor(protected http: HttpClient) {}

  create(production: IProduction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(production);
    return this.http
      .post<IProduction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(production: IProduction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(production);
    return this.http
      .put<IProduction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProduction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduction[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(production: IProduction): IProduction {
    const copy: IProduction = Object.assign({}, production, {
      prodDate: production.prodDate != null && production.prodDate.isValid() ? production.prodDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.prodDate = res.body.prodDate != null ? moment(res.body.prodDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((production: IProduction) => {
        production.prodDate = production.prodDate != null ? moment(production.prodDate) : null;
      });
    }
    return res;
  }
}
