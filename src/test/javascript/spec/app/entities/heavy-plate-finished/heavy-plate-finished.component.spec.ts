/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlatemillTestModule } from '../../../test.module';
import { HeavyPlateFinishedComponent } from 'app/entities/heavy-plate-finished/heavy-plate-finished.component';
import { HeavyPlateFinishedService } from 'app/entities/heavy-plate-finished/heavy-plate-finished.service';
import { HeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';

describe('Component Tests', () => {
  describe('HeavyPlateFinished Management Component', () => {
    let comp: HeavyPlateFinishedComponent;
    let fixture: ComponentFixture<HeavyPlateFinishedComponent>;
    let service: HeavyPlateFinishedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [HeavyPlateFinishedComponent],
        providers: []
      })
        .overrideTemplate(HeavyPlateFinishedComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HeavyPlateFinishedComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HeavyPlateFinishedService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new HeavyPlateFinished(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.heavyPlateFinisheds[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
