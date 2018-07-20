import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CostCode } from './cost-code.model';
import { CostCodeService } from './cost-code.service';

@Component({
    selector: 'jhi-cost-code-detail',
    templateUrl: './cost-code-detail.component.html'
})
export class CostCodeDetailComponent implements OnInit, OnDestroy {

    costCode: CostCode;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costCodeService: CostCodeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCostCodes();
    }

    load(id) {
        this.costCodeService.find(id)
            .subscribe((costCodeResponse: HttpResponse<CostCode>) => {
                this.costCode = costCodeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCostCodes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costCodeListModification',
            (response) => this.load(this.costCode.id)
        );
    }
}
