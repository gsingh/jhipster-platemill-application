import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPictureOfEvent } from 'app/shared/model/picture-of-event.model';
import { PictureOfEventService } from './picture-of-event.service';

@Component({
  selector: 'jhi-picture-of-event-delete-dialog',
  templateUrl: './picture-of-event-delete-dialog.component.html'
})
export class PictureOfEventDeleteDialogComponent {
  pictureOfEvent: IPictureOfEvent;

  constructor(
    protected pictureOfEventService: PictureOfEventService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pictureOfEventService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pictureOfEventListModification',
        content: 'Deleted an pictureOfEvent'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-picture-of-event-delete-popup',
  template: ''
})
export class PictureOfEventDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pictureOfEvent }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PictureOfEventDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pictureOfEvent = pictureOfEvent;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/picture-of-event', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/picture-of-event', { outlets: { popup: null } }]);
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
