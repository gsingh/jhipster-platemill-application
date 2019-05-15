/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { ShiftManagerUpdateComponent } from 'app/entities/shift-manager/shift-manager-update.component';
import { ShiftManagerService } from 'app/entities/shift-manager/shift-manager.service';
import { ShiftManager } from 'app/shared/model/shift-manager.model';

describe('Component Tests', () => {
  describe('ShiftManager Management Update Component', () => {
    let comp: ShiftManagerUpdateComponent;
    let fixture: ComponentFixture<ShiftManagerUpdateComponent>;
    let service: ShiftManagerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [ShiftManagerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ShiftManagerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShiftManagerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShiftManagerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ShiftManager(123);
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
        const entity = new ShiftManager();
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
