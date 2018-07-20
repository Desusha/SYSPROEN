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
    templateUrl: './project-dialog.component.html'
})
export class ProjectDialogComponent implements OnInit {

    project: Project;
    projects: Project[];
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;
    cols: any[];
    index: number = 0;
    items: MenuItem[];
    constructor(
       // public activeModal: NgbActiveModal,
        private projectService: ProjectService,
        private eventManager: JhiEventManager
    ) 
    {
          }

    ngOnInit() {
        debugger;
        this.isSaving = false;
        this.projectService.query().subscribe(res => {
           this.projects = res.body;

        });

        this.cols = [
            { field: 'projectNo', header: 'Project No' },
            {field: 'name', header: 'Name' }
        ];
        this.items = [
            {label: 'Stats', icon: 'fa-bar-chart'},
            {label: 'Calendar', icon: 'fa-calendar'},
            {label: 'Documentation', icon: 'fa-book'},
            {label: 'Support', icon: 'fa-support'},
            {label: 'Social', icon: 'fa-twitter'}
        ];
    }
 

    openNext() {
        this.index = (this.index === 2) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 2 : this.index - 1;
    }
    
    clear() {
      //  this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.project.id !== undefined) {
            this.subscribeToSaveResponse(
                this.projectService.update(this.project));
        } else {
            this.subscribeToSaveResponse(
                this.projectService.create(this.project));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Project>>) {
        result.subscribe((res: HttpResponse<Project>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Project) {
        this.eventManager.broadcast({ name: 'projectListModification', content: 'OK'});
        this.isSaving = false;
      //  this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-project-popup',
    template: ''
})
export class ProjectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private projectPopupService: ProjectPopupService,
       
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.projectPopupService
                    .open(ProjectDialogComponent as Component, params['id']);
            } else {
                this.projectPopupService
                    .open(ProjectDialogComponent as Component);
            }
        });
     
    }
  
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
  
}