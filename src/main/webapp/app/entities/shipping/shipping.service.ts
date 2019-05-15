import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShipping } from 'app/shared/model/shipping.model';

type EntityResponseType = HttpResponse<IShipping>;
type EntityArrayResponseType = HttpResponse<IShipping[]>;

@Injectable({ providedIn: 'root' })
export class ShippingService {
  public resourceUrl = SERVER_API_URL + 'api/shippings';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/shippings';

  constructor(protected http: HttpClient) {}

  create(shipping: IShipping): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shipping);
    return this.http
      .post<IShipping>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(shipping: IShipping): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(shipping);
    return this.http
      .put<IShipping>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IShipping>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShipping[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IShipping[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(shipping: IShipping): IShipping {
    const copy: IShipping = Object.assign({}, shipping, {
      shippingDate: shipping.shippingDate != null && shipping.shippingDate.isValid() ? shipping.shippingDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.shippingDate = res.body.shippingDate != null ? moment(res.body.shippingDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((shipping: IShipping) => {
        shipping.shippingDate = shipping.shippingDate != null ? moment(shipping.shippingDate) : null;
      });
    }
    return res;
  }
}
