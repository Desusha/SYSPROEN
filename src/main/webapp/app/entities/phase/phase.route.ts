import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PhaseComponent } from './phase.component';
import { PhaseDetailComponent } from './phase-detail.component';
import { PhasePopupComponent } from './phase-dialog.component';
import { PhaseDeletePopupComponent } from './phase-delete-dialog.component';

export const phaseRoute: Routes = [
    {
        path: 'phase',
        component: PhaseComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'phase/:id',
        component: PhaseDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const phasePopupRoute: Routes = [
    {
        path: 'phase-new',
        component: PhasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phase/:id/edit',
        component: PhasePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'phase/:id/delete',
        component: PhaseDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Phases'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
