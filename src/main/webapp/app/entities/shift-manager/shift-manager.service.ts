import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IShiftManager } from 'app/shared/model/shift-manager.model';

type EntityResponseType = HttpResponse<IShiftManager>;
type EntityArrayResponseType = HttpResponse<IShiftManager[]>;

@Injectable({ providedIn: 'root' })
export class ShiftManagerService {
  public resourceUrl = SERVER_API_URL + 'api/shift-managers';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/shift-managers';

  constructor(protected http: HttpClient) {}

  create(shiftManager: IShiftManager): Observable<EntityResponseType> {
    return this.http.post<IShiftManager>(this.resourceUrl, shiftManager, { observe: 'response' });
  }

  update(shiftManager: IShiftManager): Observable<EntityResponseType> {
    return this.http.put<IShiftManager>(this.resourceUrl, shiftManager, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShiftManager>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShiftManager[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShiftManager[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
