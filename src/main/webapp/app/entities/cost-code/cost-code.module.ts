import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SysproenerpSharedModule } from '../../shared';
import {
    CostCodeService,
    CostCodePopupService,
    CostCodeComponent,
    CostCodeDetailComponent,
    CostCodeDialogComponent,
    CostCodePopupComponent,
    CostCodeDeletePopupComponent,
    CostCodeDeleteDialogComponent,
    costCodeRoute,
    costCodePopupRoute,
    CostCodeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...costCodeRoute,
    ...costCodePopupRoute,
];

@NgModule({
    imports: [
        SysproenerpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostCodeComponent,
        CostCodeDetailComponent,
        CostCodeDialogComponent,
        CostCodeDeleteDialogComponent,
        CostCodePopupComponent,
        CostCodeDeletePopupComponent,
    ],
    entryComponents: [
        CostCodeComponent,
        CostCodeDialogComponent,
        CostCodePopupComponent,
        CostCodeDeleteDialogComponent,
        CostCodeDeletePopupComponent,
    ],
    providers: [
        CostCodeService,
        CostCodePopupService,
        CostCodeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysproenerpCostCodeModule {}
