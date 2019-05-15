import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProduction } from 'app/shared/model/production.model';
import { ProductionService } from './production.service';

@Component({
  selector: 'jhi-production-delete-dialog',
  templateUrl: './production-delete-dialog.component.html'
})
export class ProductionDeleteDialogComponent {
  production: IProduction;

  constructor(
    protected productionService: ProductionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.productionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'productionListModification',
        content: 'Deleted an production'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-production-delete-popup',
  template: ''
})
export class ProductionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ production }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProductionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.production = production;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/production', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/production', { outlets: { popup: null } }]);
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
