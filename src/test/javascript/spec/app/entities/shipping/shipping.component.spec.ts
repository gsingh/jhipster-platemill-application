/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlatemillTestModule } from '../../../test.module';
import { ShippingComponent } from 'app/entities/shipping/shipping.component';
import { ShippingService } from 'app/entities/shipping/shipping.service';
import { Shipping } from 'app/shared/model/shipping.model';

describe('Component Tests', () => {
  describe('Shipping Management Component', () => {
    let comp: ShippingComponent;
    let fixture: ComponentFixture<ShippingComponent>;
    let service: ShippingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [ShippingComponent],
        providers: []
      })
        .overrideTemplate(ShippingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShippingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShippingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Shipping(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.shippings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
