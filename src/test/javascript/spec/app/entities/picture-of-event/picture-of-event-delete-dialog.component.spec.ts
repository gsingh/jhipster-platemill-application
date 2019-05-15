/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlatemillTestModule } from '../../../test.module';
import { PictureOfEventDeleteDialogComponent } from 'app/entities/picture-of-event/picture-of-event-delete-dialog.component';
import { PictureOfEventService } from 'app/entities/picture-of-event/picture-of-event.service';

describe('Component Tests', () => {
  describe('PictureOfEvent Management Delete Component', () => {
    let comp: PictureOfEventDeleteDialogComponent;
    let fixture: ComponentFixture<PictureOfEventDeleteDialogComponent>;
    let service: PictureOfEventService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [PictureOfEventDeleteDialogComponent]
      })
        .overrideTemplate(PictureOfEventDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PictureOfEventDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PictureOfEventService);
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
