import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';

type EntityResponseType = HttpResponse<IHeavyPlateFinished>;
type EntityArrayResponseType = HttpResponse<IHeavyPlateFinished[]>;

@Injectable({ providedIn: 'root' })
export class HeavyPlateFinishedService {
  public resourceUrl = SERVER_API_URL + 'api/heavy-plate-finisheds';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/heavy-plate-finisheds';

  constructor(protected http: HttpClient) {}

  create(heavyPlateFinished: IHeavyPlateFinished): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(heavyPlateFinished);
    return this.http
      .post<IHeavyPlateFinished>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(heavyPlateFinished: IHeavyPlateFinished): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(heavyPlateFinished);
    return this.http
      .put<IHeavyPlateFinished>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHeavyPlateFinished>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHeavyPlateFinished[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHeavyPlateFinished[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(heavyPlateFinished: IHeavyPlateFinished): IHeavyPlateFinished {
    const copy: IHeavyPlateFinished = Object.assign({}, heavyPlateFinished, {
      hPFinishedDate:
        heavyPlateFinished.hPFinishedDate != null && heavyPlateFinished.hPFinishedDate.isValid()
          ? heavyPlateFinished.hPFinishedDate.format(DATE_FORMAT)
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.hPFinishedDate = res.body.hPFinishedDate != null ? moment(res.body.hPFinishedDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((heavyPlateFinished: IHeavyPlateFinished) => {
        heavyPlateFinished.hPFinishedDate = heavyPlateFinished.hPFinishedDate != null ? moment(heavyPlateFinished.hPFinishedDate) : null;
      });
    }
    return res;
  }
}
