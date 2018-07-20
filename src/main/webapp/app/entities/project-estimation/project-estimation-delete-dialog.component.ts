import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectEstimation } from './project-estimation.model';
import { ProjectEstimationPopupService } from './project-estimation-popup.service';
import { ProjectEstimationService } from './project-estimation.service';

@Component({
    selector: 'jhi-project-estimation-delete-dialog',
    templateUrl: './project-estimation-delete-dialog.component.html'
})
export class ProjectEstimationDeleteDialogComponent {

    projectEstimation: ProjectEstimation;

    constructor(
        private projectEstimationService: ProjectEstimationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectEstimationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projectEstimationListModification',
                content: 'Deleted an projectEstimation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-estimation-delete-popup',
    template: ''
})
export class ProjectEstimationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectEstimationPopupService: ProjectEstimationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.projectEstimationPopupService
                .open(ProjectEstimationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
