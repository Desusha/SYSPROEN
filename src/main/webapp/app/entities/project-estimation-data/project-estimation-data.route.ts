import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ProjectEstimationDataComponent } from './project-estimation-data.component';
import { ProjectEstimationDataDetailComponent } from './project-estimation-data-detail.component';
import { ProjectEstimationDataPopupComponent } from './project-estimation-data-dialog.component';
import { ProjectEstimationDataDeletePopupComponent } from './project-estimation-data-delete-dialog.component';

export const projectEstimationDataRoute: Routes = [
    {
        path: 'project-estimation-data',
        component: ProjectEstimationDataComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimationData'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'project-estimation-data/:id',
        component: ProjectEstimationDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimationData'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectEstimationDataPopupRoute: Routes = [
    {
        path: 'project-estimation-data-new',
        component: ProjectEstimationDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimationData'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-estimation-data/:id/edit',
        component: ProjectEstimationDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimationData'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'project-estimation-data/:id/delete',
        component: ProjectEstimationDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProjectEstimationData'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
