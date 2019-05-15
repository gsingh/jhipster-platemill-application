/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { PictureOfEventUpdateComponent } from 'app/entities/picture-of-event/picture-of-event-update.component';
import { PictureOfEventService } from 'app/entities/picture-of-event/picture-of-event.service';
import { PictureOfEvent } from 'app/shared/model/picture-of-event.model';

describe('Component Tests', () => {
  describe('PictureOfEvent Management Update Component', () => {
    let comp: PictureOfEventUpdateComponent;
    let fixture: ComponentFixture<PictureOfEventUpdateComponent>;
    let service: PictureOfEventService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [PictureOfEventUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PictureOfEventUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PictureOfEventUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PictureOfEventService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PictureOfEvent(123);
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
        const entity = new PictureOfEvent();
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
