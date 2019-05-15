/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlatemillTestModule } from '../../../test.module';
import { ProductionComponent } from 'app/entities/production/production.component';
import { ProductionService } from 'app/entities/production/production.service';
import { Production } from 'app/shared/model/production.model';

describe('Component Tests', () => {
  describe('Production Management Component', () => {
    let comp: ProductionComponent;
    let fixture: ComponentFixture<ProductionComponent>;
    let service: ProductionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [ProductionComponent],
        providers: []
      })
        .overrideTemplate(ProductionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Production(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
