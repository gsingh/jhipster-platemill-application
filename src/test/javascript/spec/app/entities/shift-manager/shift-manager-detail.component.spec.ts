/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { ShiftManagerDetailComponent } from 'app/entities/shift-manager/shift-manager-detail.component';
import { ShiftManager } from 'app/shared/model/shift-manager.model';

describe('Component Tests', () => {
  describe('ShiftManager Management Detail Component', () => {
    let comp: ShiftManagerDetailComponent;
    let fixture: ComponentFixture<ShiftManagerDetailComponent>;
    const route = ({ data: of({ shiftManager: new ShiftManager(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [ShiftManagerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ShiftManagerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShiftManagerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shiftManager).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
