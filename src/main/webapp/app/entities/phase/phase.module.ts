import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SysproenerpSharedModule } from '../../shared';
import {
    PhaseService,
    PhasePopupService,
    PhaseComponent,
    PhaseDetailComponent,
    PhaseDialogComponent,
    PhasePopupComponent,
    PhaseDeletePopupComponent,
    PhaseDeleteDialogComponent,
    phaseRoute,
    phasePopupRoute,
} from './';

const ENTITY_STATES = [
    ...phaseRoute,
    ...phasePopupRoute,
];

@NgModule({
    imports: [
        SysproenerpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PhaseComponent,
        PhaseDetailComponent,
        PhaseDialogComponent,
        PhaseDeleteDialogComponent,
        PhasePopupComponent,
        PhaseDeletePopupComponent,
    ],
    entryComponents: [
        PhaseComponent,
        PhaseDialogComponent,
        PhasePopupComponent,
        PhaseDeleteDialogComponent,
        PhaseDeletePopupComponent,
    ],
    providers: [
        PhaseService,
        PhasePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysproenerpPhaseModule {}
