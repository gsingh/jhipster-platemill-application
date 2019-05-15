/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { PlatemillTestModule } from '../../../test.module';
import { EventOfPlateMillUpdateComponent } from 'app/entities/event-of-plate-mill/event-of-plate-mill-update.component';
import { EventOfPlateMillService } from 'app/entities/event-of-plate-mill/event-of-plate-mill.service';
import { EventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';

describe('Component Tests', () => {
  describe('EventOfPlateMill Management Update Component', () => {
    let comp: EventOfPlateMillUpdateComponent;
    let fixture: ComponentFixture<EventOfPlateMillUpdateComponent>;
    let service: EventOfPlateMillService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [EventOfPlateMillUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EventOfPlateMillUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EventOfPlateMillUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventOfPlateMillService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EventOfPlateMill(123);
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
        const entity = new EventOfPlateMill();
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
