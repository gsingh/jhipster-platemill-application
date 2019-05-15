/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PlatemillTestModule } from '../../../test.module';
import { NormalisingDeleteDialogComponent } from 'app/entities/normalising/normalising-delete-dialog.component';
import { NormalisingService } from 'app/entities/normalising/normalising.service';

describe('Component Tests', () => {
  describe('Normalising Management Delete Component', () => {
    let comp: NormalisingDeleteDialogComponent;
    let fixture: ComponentFixture<NormalisingDeleteDialogComponent>;
    let service: NormalisingService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PlatemillTestModule],
        declarations: [NormalisingDeleteDialogComponent]
      })
        .overrideTemplate(NormalisingDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NormalisingDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NormalisingService);
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
