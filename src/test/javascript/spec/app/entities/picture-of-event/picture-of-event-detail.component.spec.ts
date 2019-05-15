/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { PictureOfEventDetailComponent } from 'app/entities/picture-of-event/picture-of-event-detail.component';
import { PictureOfEvent } from 'app/shared/model/picture-of-event.model';

describe('Component Tests', () => {
  describe('PictureOfEvent Management Detail Component', () => {
    let comp: PictureOfEventDetailComponent;
    let fixture: ComponentFixture<PictureOfEventDetailComponent>;
    const route = ({ data: of({ pictureOfEvent: new PictureOfEvent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [PictureOfEventDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PictureOfEventDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PictureOfEventDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pictureOfEvent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
