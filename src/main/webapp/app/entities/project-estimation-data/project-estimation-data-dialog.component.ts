import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectEstimationData } from './project-estimation-data.model';
import { ProjectEstimationDataPopupService } from './project-estimation-data-popup.service';
import { ProjectEstimationDataService } from './project-estimation-data.service';
import { CostCode, CostCodeService } from '../cost-code';
import { ProjectEstimation, ProjectEstimationService } from '../project-estimation';

@Component({
    selector: 'jhi-project-estimation-data-dialog',
    templateUrl: './project-estimation-data-dialog.component.html'
})
export class ProjectEstimationDataDialogComponent implements OnInit {

    projectEstimationData: ProjectEstimationData;
    isSaving: boolean;

    costcodes: CostCode[];

    projectestimations: ProjectEstimation[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private projectEstimationDataService: ProjectEstimationDataService,
        private costCodeService: CostCodeService,
        private projectEstimationService: ProjectEstimationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.costCodeService.query()
            .subscribe((res: HttpResponse<CostCode[]>) => { this.costcodes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.projectEstimationService.query()
            .subscribe((res: HttpResponse<ProjectEstimation[]>) => { this.projectestimations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.projectEstimationData.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectEstimationDataService.update(this.projectEstimationData));
        } else {
            this.subscribeToSaveResponse(
                this.projectEstimationDataService.create(this.projectEstimationData));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProjectEstimationData>>) {
        result.subscribe((res: HttpResponse<ProjectEstimationData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProjectEstimationData) {
        this.eventManager.broadcast({ name: 'projectEstimationDataListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCostCodeById(index: number, item: CostCode) {
        return item.id;
    }

    trackProjectEstimationById(index: number, item: ProjectEstimation) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-project-estimation-data-popup',
    template: ''
})
export class ProjectEstimationDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectEstimationDataPopupService: ProjectEstimationDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.projectEstimationDataPopupService
                    .open(ProjectEstimationDataDialogComponent as Component, params['id']);
            } else {
                this.projectEstimationDataPopupService
                    .open(ProjectEstimationDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
