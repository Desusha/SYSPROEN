import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectEstimation } from './project-estimation.model';
import { ProjectEstimationService } from './project-estimation.service';

@Component({
    selector: 'jhi-project-estimation-detail',
    templateUrl: './project-estimation-detail.component.html'
})
export class ProjectEstimationDetailComponent implements OnInit, OnDestroy {

    projectEstimation: ProjectEstimation;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private projectEstimationService: ProjectEstimationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjectEstimations();
    }

    load(id) {
        this.projectEstimationService.find(id)
            .subscribe((projectEstimationResponse: HttpResponse<ProjectEstimation>) => {
                this.projectEstimation = projectEstimationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjectEstimations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectEstimationListModification',
            (response) => this.load(this.projectEstimation.id)
        );
    }
}
