/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { NormalisingUpdateComponent } from 'app/entities/normalising/normalising-update.component';
import { NormalisingService } from 'app/entities/normalising/normalising.service';
import { Normalising } from 'app/shared/model/normalising.model';

describe('Component Tests', () => {
  describe('Normalising Management Update Component', () => {
    let comp: NormalisingUpdateComponent;
    let fixture: ComponentFixture<NormalisingUpdateComponent>;
    let service: NormalisingService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [NormalisingUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NormalisingUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NormalisingUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormalisingService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Normalising(123);
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
        const entity = new Normalising();
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
