import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectEstimationData } from './project-estimation-data.model';
import { ProjectEstimationDataService } from './project-estimation-data.service';

@Component({
    selector: 'jhi-project-estimation-data-detail',
    templateUrl: './project-estimation-data-detail.component.html'
})
export class ProjectEstimationDataDetailComponent implements OnInit, OnDestroy {

    projectEstimationData: ProjectEstimationData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private projectEstimationDataService: ProjectEstimationDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProjectEstimationData();
    }

    load(id) {
        this.projectEstimationDataService.find(id)
            .subscribe((projectEstimationDataResponse: HttpResponse<ProjectEstimationData>) => {
                this.projectEstimationData = projectEstimationDataResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProjectEstimationData() {
        this.eventSubscriber = this.eventManager.subscribe(
            'projectEstimationDataListModification',
            (response) => this.load(this.projectEstimationData.id)
        );
    }
}
