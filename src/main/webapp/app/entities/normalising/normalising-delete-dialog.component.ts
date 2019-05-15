import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INormalising } from 'app/shared/model/normalising.model';
import { NormalisingService } from './normalising.service';

@Component({
  selector: 'jhi-normalising-delete-dialog',
  templateUrl: './normalising-delete-dialog.component.html'
})
export class NormalisingDeleteDialogComponent {
  normalising: INormalising;

  constructor(
    protected normalisingService: NormalisingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.normalisingService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'normalisingListModification',
        content: 'Deleted an normalising'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-normalising-delete-popup',
  template: ''
})
export class NormalisingDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ normalising }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NormalisingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.normalising = normalising;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/normalising', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/normalising', { outlets: { popup: null } }]);
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
