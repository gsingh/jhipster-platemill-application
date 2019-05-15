/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlatemillTestModule } from '../../../test.module';
import { PictureOfEventComponent } from 'app/entities/picture-of-event/picture-of-event.component';
import { PictureOfEventService } from 'app/entities/picture-of-event/picture-of-event.service';
import { PictureOfEvent } from 'app/shared/model/picture-of-event.model';

describe('Component Tests', () => {
  describe('PictureOfEvent Management Component', () => {
    let comp: PictureOfEventComponent;
    let fixture: ComponentFixture<PictureOfEventComponent>;
    let service: PictureOfEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [PictureOfEventComponent],
        providers: []
      })
        .overrideTemplate(PictureOfEventComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PictureOfEventComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PictureOfEventService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PictureOfEvent(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pictureOfEvents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
