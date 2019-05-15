import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IShiftManager } from 'app/shared/model/shift-manager.model';
import { ShiftManagerService } from './shift-manager.service';

@Component({
  selector: 'jhi-shift-manager-delete-dialog',
  templateUrl: './shift-manager-delete-dialog.component.html'
})
export class ShiftManagerDeleteDialogComponent {
  shiftManager: IShiftManager;

  constructor(
    protected shiftManagerService: ShiftManagerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.shiftManagerService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'shiftManagerListModification',
        content: 'Deleted an shiftManager'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-shift-manager-delete-popup',
  template: ''
})
export class ShiftManagerDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ shiftManager }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ShiftManagerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.shiftManager = shiftManager;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/shift-manager', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/shift-manager', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
