/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { HeavyPlateFinishedDetailComponent } from 'app/entities/heavy-plate-finished/heavy-plate-finished-detail.component';
import { HeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';

describe('Component Tests', () => {
  describe('HeavyPlateFinished Management Detail Component', () => {
    let comp: HeavyPlateFinishedDetailComponent;
    let fixture: ComponentFixture<HeavyPlateFinishedDetailComponent>;
    const route = ({ data: of({ heavyPlateFinished: new HeavyPlateFinished(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [HeavyPlateFinishedDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HeavyPlateFinishedDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HeavyPlateFinishedDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.heavyPlateFinished).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
