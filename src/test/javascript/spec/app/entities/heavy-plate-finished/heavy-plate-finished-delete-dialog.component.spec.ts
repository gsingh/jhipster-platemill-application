/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlatemillTestModule } from '../../../test.module';
import { HeavyPlateFinishedDeleteDialogComponent } from 'app/entities/heavy-plate-finished/heavy-plate-finished-delete-dialog.component';
import { HeavyPlateFinishedService } from 'app/entities/heavy-plate-finished/heavy-plate-finished.service';

describe('Component Tests', () => {
  describe('HeavyPlateFinished Management Delete Component', () => {
    let comp: HeavyPlateFinishedDeleteDialogComponent;
    let fixture: ComponentFixture<HeavyPlateFinishedDeleteDialogComponent>;
    let service: HeavyPlateFinishedService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [HeavyPlateFinishedDeleteDialogComponent]
      })
        .overrideTemplate(HeavyPlateFinishedDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HeavyPlateFinishedDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HeavyPlateFinishedService);
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
