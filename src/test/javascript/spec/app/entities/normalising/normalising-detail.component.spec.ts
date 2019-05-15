/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { NormalisingDetailComponent } from 'app/entities/normalising/normalising-detail.component';
import { Normalising } from 'app/shared/model/normalising.model';

describe('Component Tests', () => {
  describe('Normalising Management Detail Component', () => {
    let comp: NormalisingDetailComponent;
    let fixture: ComponentFixture<NormalisingDetailComponent>;
    const route = ({ data: of({ normalising: new Normalising(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [NormalisingDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NormalisingDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NormalisingDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.normalising).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
