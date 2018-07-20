import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProjectEstimationComponent } from './project-estimation.component';
import { ProjectEstimationDetailComponent } from './project-estimation-detail.component';
import { ProjectEstimationPopupComponent } from './project-estimation-dialog.component';
import { ProjectEstimationDeletePopupComponent } from './project-estimation-delete-dialog.component';

export const projectEstimationRoute: Routes = [
    {
        path: 'project-estimation',
        component: ProjectEstimationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'project-estimation/:id',
        component: ProjectEstimationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectEstimationPopupRoute: Routes = [
    {
        path: 'project-estimation-new',
        component: ProjectEstimationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-estimation/:id/edit',
        component: ProjectEstimationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-estimation/:id/delete',
        component: ProjectEstimationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
