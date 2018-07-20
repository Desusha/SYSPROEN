import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostCode } from './cost-code.model';
import { CostCodePopupService } from './cost-code-popup.service';
import { CostCodeService } from './cost-code.service';

@Component({
    selector: 'jhi-cost-code-delete-dialog',
    templateUrl: './cost-code-delete-dialog.component.html'
})
export class CostCodeDeleteDialogComponent {

    costCode: CostCode;

    constructor(
        private costCodeService: CostCodeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costCodeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costCodeListModification',
                content: 'Deleted an costCode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-code-delete-popup',
    template: ''
})
export class CostCodeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costCodePopupService: CostCodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costCodePopupService
                .open(CostCodeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
