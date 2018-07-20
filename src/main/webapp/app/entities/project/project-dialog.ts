import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Project } from './project.model';
import { ProjectPopupService } from './project-popup.service';
import { ProjectService } from './project.service';
import { AsyncAction } from 'rxjs/scheduler/AsyncAction';
import { MenuItem } from 'primeng/components/common/api';



@Component({
    selector: 'jhi-project-dialog',
    templateUrl: './project-dialog.html'
})
export class ProjectDialogModal implements OnInit {

    constructor(
        public activeModal: NgbActiveModal,
        private projectService: ProjectService,
        private eventManager: JhiEventManager
    ) { }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}
@Component({
    selector: 'jhi-project-popup',
    template: ''
})
export class ProjectPopupModel implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectPopupService: ProjectPopupService,

    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.projectPopupService
                    .open(ProjectDialogModal as Component, params['id']);
            } else {
                this.projectPopupService
                    .open(ProjectDialogModal as Component);
            }
        });

    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

