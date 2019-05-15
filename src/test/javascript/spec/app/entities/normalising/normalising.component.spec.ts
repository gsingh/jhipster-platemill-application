/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlatemillTestModule } from '../../../test.module';
import { NormalisingComponent } from 'app/entities/normalising/normalising.component';
import { NormalisingService } from 'app/entities/normalising/normalising.service';
import { Normalising } from 'app/shared/model/normalising.model';

describe('Component Tests', () => {
  describe('Normalising Management Component', () => {
    let comp: NormalisingComponent;
    let fixture: ComponentFixture<NormalisingComponent>;
    let service: NormalisingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [NormalisingComponent],
        providers: []
      })
        .overrideTemplate(NormalisingComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NormalisingComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormalisingService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Normalising(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.normalisings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
