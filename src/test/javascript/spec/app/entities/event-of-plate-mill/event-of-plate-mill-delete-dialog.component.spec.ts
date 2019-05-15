/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlatemillTestModule } from '../../../test.module';
import { EventOfPlateMillDeleteDialogComponent } from 'app/entities/event-of-plate-mill/event-of-plate-mill-delete-dialog.component';
import { EventOfPlateMillService } from 'app/entities/event-of-plate-mill/event-of-plate-mill.service';

describe('Component Tests', () => {
  describe('EventOfPlateMill Management Delete Component', () => {
    let comp: EventOfPlateMillDeleteDialogComponent;
    let fixture: ComponentFixture<EventOfPlateMillDeleteDialogComponent>;
    let service: EventOfPlateMillService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [EventOfPlateMillDeleteDialogComponent]
      })
        .overrideTemplate(EventOfPlateMillDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EventOfPlateMillDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EventOfPlateMillService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
