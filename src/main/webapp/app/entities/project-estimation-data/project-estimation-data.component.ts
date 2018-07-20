import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectEstimationData } from './project-estimation-data.model';
import { ProjectEstimationDataService } from './project-estimation-data.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-project-estimation-data',
    templateUrl: './project-estimation-data.component.html'
})
export class ProjectEstimationDataComponent implements OnInit, OnDestroy {
projectEstimationData: ProjectEstimationData[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private projectEstimationDataService: ProjectEstimationDataService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.projectEstimationDataService.query().subscribe(
            (res: HttpResponse<ProjectEstimationData[]>) => {
                this.projectEstimationData = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProjectEstimationData();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProjectEstimationData) {
        return item.id;
    }
    registerChangeInProjectEstimationData() {
        this.eventSubscriber = this.eventManager.subscribe('projectEstimationDataListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
