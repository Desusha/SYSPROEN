import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ProjectEstimation } from './project-estimation.model';
import { ProjectEstimationService } from './project-estimation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-project-estimation',
    templateUrl: './project-estimation.component.html'
})
export class ProjectEstimationComponent implements OnInit, OnDestroy {
projectEstimations: ProjectEstimation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private projectEstimationService: ProjectEstimationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.projectEstimationService.query().subscribe(
            (res: HttpResponse<ProjectEstimation[]>) => {
                this.projectEstimations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInProjectEstimations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ProjectEstimation) {
        return item.id;
    }
    registerChangeInProjectEstimations() {
        this.eventSubscriber = this.eventManager.subscribe('projectEstimationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
