import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SysproenerpSharedModule } from '../../shared';
import {
    ProjectEstimationService,
    ProjectEstimationPopupService,
    ProjectEstimationComponent,
    ProjectEstimationDetailComponent,
    ProjectEstimationDialogComponent,
    ProjectEstimationPopupComponent,
    ProjectEstimationDeletePopupComponent,
    ProjectEstimationDeleteDialogComponent,
    projectEstimationRoute,
    projectEstimationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...projectEstimationRoute,
    ...projectEstimationPopupRoute,
];

@NgModule({
    imports: [
        SysproenerpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProjectEstimationComponent,
        ProjectEstimationDetailComponent,
        ProjectEstimationDialogComponent,
        ProjectEstimationDeleteDialogComponent,
        ProjectEstimationPopupComponent,
        ProjectEstimationDeletePopupComponent,
    ],
    entryComponents: [
        ProjectEstimationComponent,
        ProjectEstimationDialogComponent,
        ProjectEstimationPopupComponent,
        ProjectEstimationDeleteDialogComponent,
        ProjectEstimationDeletePopupComponent,
    ],
    providers: [
        ProjectEstimationService,
        ProjectEstimationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysproenerpProjectEstimationModule {}
