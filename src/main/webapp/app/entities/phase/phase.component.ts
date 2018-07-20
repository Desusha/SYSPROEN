import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Phase } from './phase.model';
import { PhaseService } from './phase.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-phase',
    templateUrl: './phase.component.html'
})
export class PhaseComponent implements OnInit, OnDestroy {
phases: Phase[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private phaseService: PhaseService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.phaseService.query().subscribe(
            (res: HttpResponse<Phase[]>) => {
                this.phases = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPhases();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Phase) {
        return item.id;
    }
    registerChangeInPhases() {
        this.eventSubscriber = this.eventManager.subscribe('phaseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
