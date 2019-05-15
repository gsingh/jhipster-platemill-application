/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { HeavyPlateFinishedUpdateComponent } from 'app/entities/heavy-plate-finished/heavy-plate-finished-update.component';
import { HeavyPlateFinishedService } from 'app/entities/heavy-plate-finished/heavy-plate-finished.service';
import { HeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';

describe('Component Tests', () => {
  describe('HeavyPlateFinished Management Update Component', () => {
    let comp: HeavyPlateFinishedUpdateComponent;
    let fixture: ComponentFixture<HeavyPlateFinishedUpdateComponent>;
    let service: HeavyPlateFinishedService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [HeavyPlateFinishedUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HeavyPlateFinishedUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HeavyPlateFinishedUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HeavyPlateFinishedService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HeavyPlateFinished(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new HeavyPlateFinished();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
