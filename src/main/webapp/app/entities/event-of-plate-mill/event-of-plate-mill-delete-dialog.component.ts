import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEventOfPlateMill } from 'app/shared/model/event-of-plate-mill.model';
import { EventOfPlateMillService } from './event-of-plate-mill.service';

@Component({
  selector: 'jhi-event-of-plate-mill-delete-dialog',
  templateUrl: './event-of-plate-mill-delete-dialog.component.html'
})
export class EventOfPlateMillDeleteDialogComponent {
  eventOfPlateMill: IEventOfPlateMill;

  constructor(
    protected eventOfPlateMillService: EventOfPlateMillService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.eventOfPlateMillService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'eventOfPlateMillListModification',
        content: 'Deleted an eventOfPlateMill'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-event-of-plate-mill-delete-popup',
  template: ''
})
export class EventOfPlateMillDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ eventOfPlateMill }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EventOfPlateMillDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.eventOfPlateMill = eventOfPlateMill;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/event-of-plate-mill', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/event-of-plate-mill', { outlets: { popup: null } }]);
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
