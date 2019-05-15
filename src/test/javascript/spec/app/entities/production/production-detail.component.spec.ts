/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { ProductionDetailComponent } from 'app/entities/production/production-detail.component';
import { Production } from 'app/shared/model/production.model';

describe('Component Tests', () => {
  describe('Production Management Detail Component', () => {
    let comp: ProductionDetailComponent;
    let fixture: ComponentFixture<ProductionDetailComponent>;
    const route = ({ data: of({ production: new Production(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [ProductionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.production).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
