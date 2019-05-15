/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlatemillTestModule } from '../../../test.module';
import { ShiftManagerDeleteDialogComponent } from 'app/entities/shift-manager/shift-manager-delete-dialog.component';
import { ShiftManagerService } from 'app/entities/shift-manager/shift-manager.service';

describe('Component Tests', () => {
  describe('ShiftManager Management Delete Component', () => {
    let comp: ShiftManagerDeleteDialogComponent;
    let fixture: ComponentFixture<ShiftManagerDeleteDialogComponent>;
    let service: ShiftManagerService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [ShiftManagerDeleteDialogComponent]
      })
        .overrideTemplate(ShiftManagerDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShiftManagerDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ShiftManagerService);
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
