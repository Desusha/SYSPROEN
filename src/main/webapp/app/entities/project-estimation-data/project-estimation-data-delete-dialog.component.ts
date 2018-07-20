import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectEstimationData } from './project-estimation-data.model';
import { ProjectEstimationDataPopupService } from './project-estimation-data-popup.service';
import { ProjectEstimationDataService } from './project-estimation-data.service';

@Component({
    selector: 'jhi-project-estimation-data-delete-dialog',
    templateUrl: './project-estimation-data-delete-dialog.component.html'
})
export class ProjectEstimationDataDeleteDialogComponent {

    projectEstimationData: ProjectEstimationData;

    constructor(
        private projectEstimationDataService: ProjectEstimationDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.projectEstimationDataService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'projectEstimationDataListModification',
                content: 'Deleted an projectEstimationData'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-project-estimation-data-delete-popup',
    template: ''
})
export class ProjectEstimationDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectEstimationDataPopupService: ProjectEstimationDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.projectEstimationDataPopupService
                .open(ProjectEstimationDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
