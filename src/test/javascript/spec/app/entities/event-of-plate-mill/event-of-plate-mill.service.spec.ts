/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EventOfPlateMillService } from 'app/entities/event-of-plate-mill/event-of-plate-mill.service';
import { IEventOfPlateMill, EventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

describe('Service Tests', () => {
  describe('EventOfPlateMill Service', () => {
    let injector: TestBed;
    let service: EventOfPlateMillService;
    let httpMock: HttpTestingController;
    let elemDefault: IEventOfPlateMill;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EventOfPlateMillService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new EventOfPlateMill(0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            eventDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a EventOfPlateMill', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            eventDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            eventDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new EventOfPlateMill(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a EventOfPlateMill', async () => {
        const returnedFromService = Object.assign(
          {
            eventDate: currentDate.format(DATE_FORMAT),
            eventName: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of EventOfPlateMill', async () => {
        const returnedFromService = Object.assign(
          {
            eventDate: currentDate.format(DATE_FORMAT),
            eventName: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            eventDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EventOfPlateMill', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
