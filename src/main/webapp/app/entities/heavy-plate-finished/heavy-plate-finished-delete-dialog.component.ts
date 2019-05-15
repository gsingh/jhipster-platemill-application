import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHeavyPlateFinished } from 'app/shared/model/heavy-plate-finished.model';
import { HeavyPlateFinishedService } from './heavy-plate-finished.service';

@Component({
  selector: 'jhi-heavy-plate-finished-delete-dialog',
  templateUrl: './heavy-plate-finished-delete-dialog.component.html'
})
export class HeavyPlateFinishedDeleteDialogComponent {
  heavyPlateFinished: IHeavyPlateFinished;

  constructor(
    protected heavyPlateFinishedService: HeavyPlateFinishedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.heavyPlateFinishedService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'heavyPlateFinishedListModification',
        content: 'Deleted an heavyPlateFinished'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-heavy-plate-finished-delete-popup',
  template: ''
})
export class HeavyPlateFinishedDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ heavyPlateFinished }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HeavyPlateFinishedDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.heavyPlateFinished = heavyPlateFinished;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/heavy-plate-finished', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/heavy-plate-finished', { outlets: { popup: null } }]);
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
