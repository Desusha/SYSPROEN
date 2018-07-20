import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SysproenerpSharedModule } from '../../shared';
import {
    ProjectEstimationDataService,
    ProjectEstimationDataPopupService,
    ProjectEstimationDataComponent,
    ProjectEstimationDataDetailComponent,
    ProjectEstimationDataDialogComponent,
    ProjectEstimationDataPopupComponent,
    ProjectEstimationDataDeletePopupComponent,
    ProjectEstimationDataDeleteDialogComponent,
    projectEstimationDataRoute,
    projectEstimationDataPopupRoute,
} from './';

const ENTITY_STATES = [
    ...projectEstimationDataRoute,
    ...projectEstimationDataPopupRoute,
];

@NgModule({
    imports: [
        SysproenerpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProjectEstimationDataComponent,
        ProjectEstimationDataDetailComponent,
        ProjectEstimationDataDialogComponent,
        ProjectEstimationDataDeleteDialogComponent,
        ProjectEstimationDataPopupComponent,
        ProjectEstimationDataDeletePopupComponent,
    ],
    entryComponents: [
        ProjectEstimationDataComponent,
        ProjectEstimationDataDialogComponent,
        ProjectEstimationDataPopupComponent,
        ProjectEstimationDataDeleteDialogComponent,
        ProjectEstimationDataDeletePopupComponent,
    ],
    providers: [
        ProjectEstimationDataService,
        ProjectEstimationDataPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysproenerpProjectEstimationDataModule {}
