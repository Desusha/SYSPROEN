import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectEstimation } from './project-estimation.model';
import { ProjectEstimationPopupService } from './project-estimation-popup.service';
import { ProjectEstimationService } from './project-estimation.service';
import { Project, ProjectService } from '../project';
import { Phase, PhaseService } from '../phase';

@Component({
    selector: 'jhi-project-estimation-dialog',
    templateUrl: './project-estimation-dialog.component.html'
})
export class ProjectEstimationDialogComponent implements OnInit {

    projectEstimation: ProjectEstimation;
    isSaving: boolean;

    projects: Project[];

    phases: Phase[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private projectEstimationService: ProjectEstimationService,
        private projectService: ProjectService,
        private phaseService: PhaseService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projectService.query()
            .subscribe((res: HttpResponse<Project[]>) => { this.projects = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.phaseService.query()
            .subscribe((res: HttpResponse<Phase[]>) => { this.phases = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.projectEstimation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectEstimationService.update(this.projectEstimation));
        } else {
            this.subscribeToSaveResponse(
                this.projectEstimationService.create(this.projectEstimation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProjectEstimation>>) {
        result.subscribe((res: HttpResponse<ProjectEstimation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProjectEstimation) {
        this.eventManager.broadcast({ name: 'projectEstimationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjectById(index: number, item: Project) {
        return item.id;
    }

    trackPhaseById(index: number, item: Phase) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-project-estimation-popup',
    template: ''
})
export class ProjectEstimationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectEstimationPopupService: ProjectEstimationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.projectEstimationPopupService
                    .open(ProjectEstimationDialogComponent as Component, params['id']);
            } else {
                this.projectEstimationPopupService
                    .open(ProjectEstimationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
