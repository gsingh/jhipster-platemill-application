/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { EventOfPlateMillDetailComponent } from 'app/entities/event-of-plate-mill/event-of-plate-mill-detail.component';
import { EventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

describe('Component Tests', () => {
  describe('EventOfPlateMill Management Detail Component', () => {
    let comp: EventOfPlateMillDetailComponent;
    let fixture: ComponentFixture<EventOfPlateMillDetailComponent>;
    const route = ({ data: of({ eventOfPlateMill: new EventOfPlateMill(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [EventOfPlateMillDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EventOfPlateMillDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EventOfPlateMillDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.eventOfPlateMill).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
