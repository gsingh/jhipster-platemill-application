/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ShippingService } from 'app/entities/shipping/shipping.service';
import { IShipping, Shipping, Shift } from 'app/shared/model/shipping.model';

describe('Service Tests', () => {
  describe('Shipping Service', () => {
    let injector: TestBed;
    let service: ShippingService;
    let httpMock: HttpTestingController;
    let elemDefault: IShipping;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ShippingService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Shipping(0, currentDate, Shift.A, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            shippingDate: currentDate.format(DATE_FORMAT)
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

      it('should create a Shipping', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            shippingDate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            shippingDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new Shipping(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Shipping', async () => {
        const returnedFromService = Object.assign(
          {
            shippingDate: currentDate.format(DATE_FORMAT),
            shift: 'BBBBBB',
            noOfWagons: 1,
            noOfTrailers: 1,
            shippedTonnage: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            shippingDate: currentDate
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

      it('should return a list of Shipping', async () => {
        const returnedFromService = Object.assign(
          {
            shippingDate: currentDate.format(DATE_FORMAT),
            shift: 'BBBBBB',
            noOfWagons: 1,
            noOfTrailers: 1,
            shippedTonnage: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            shippingDate: currentDate
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

      it('should delete a Shipping', async () => {
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
