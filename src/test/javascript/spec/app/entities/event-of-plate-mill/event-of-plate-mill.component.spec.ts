/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlatemillTestModule } from '../../../test.module';
import { EventOfPlateMillComponent } from 'app/entities/event-of-plate-mill/event-of-plate-mill.component';
import { EventOfPlateMillService } from 'app/entities/event-of-plate-mill/event-of-plate-mill.service';
import { EventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

describe('Component Tests', () => {
  describe('EventOfPlateMill Management Component', () => {
    let comp: EventOfPlateMillComponent;
    let fixture: ComponentFixture<EventOfPlateMillComponent>;
    let service: EventOfPlateMillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [EventOfPlateMillComponent],
        providers: []
      })
        .overrideTemplate(EventOfPlateMillComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventOfPlateMillComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventOfPlateMillService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EventOfPlateMill(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.eventOfPlateMills[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
