import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProjectEstimationData } from './project-estimation-data.model';
import { ProjectEstimationDataService } from './project-estimation-data.service';

@Injectable()
export class ProjectEstimationDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private projectEstimationDataService: ProjectEstimationDataService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.projectEstimationDataService.find(id)
                    .subscribe((projectEstimationDataResponse: HttpResponse<ProjectEstimationData>) => {
                        const projectEstimationData: ProjectEstimationData = projectEstimationDataResponse.body;
                        this.ngbModalRef = this.projectEstimationDataModalRef(component, projectEstimationData);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.projectEstimationDataModalRef(component, new ProjectEstimationData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    projectEstimationDataModalRef(component: Component, projectEstimationData: ProjectEstimationData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.projectEstimationData = projectEstimationData;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
