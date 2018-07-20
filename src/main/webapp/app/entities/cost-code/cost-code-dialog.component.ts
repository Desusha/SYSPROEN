import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostCode } from './cost-code.model';
import { CostCodePopupService } from './cost-code-popup.service';
import { CostCodeService } from './cost-code.service';

@Component({
    selector: 'jhi-cost-code-dialog',
    templateUrl: './cost-code-dialog.component.html'
})
export class CostCodeDialogComponent implements OnInit {

    costCode: CostCode;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private costCodeService: CostCodeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.costCode.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costCodeService.update(this.costCode));
        } else {
            this.subscribeToSaveResponse(
                this.costCodeService.create(this.costCode));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostCode>>) {
        result.subscribe((res: HttpResponse<CostCode>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostCode) {
        this.eventManager.broadcast({ name: 'costCodeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cost-code-popup',
    template: ''
})
export class CostCodePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costCodePopupService: CostCodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costCodePopupService
                    .open(CostCodeDialogComponent as Component, params['id']);
            } else {
                this.costCodePopupService
                    .open(CostCodeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
