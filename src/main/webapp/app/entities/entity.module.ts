import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SysproenerpProjectModule } from './project/project.module';
import { SysproenerpPhaseModule } from './phase/phase.module';
import { SysproenerpCostCodeModule } from './cost-code/cost-code.module';
import { SysproenerpProjectEstimationModule } from './project-estimation/project-estimation.module';
import { SysproenerpProjectEstimationDataModule } from './project-estimation-data/project-estimation-data.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SysproenerpProjectModule,
        SysproenerpPhaseModule,
        SysproenerpCostCodeModule,
        SysproenerpProjectEstimationModule,
        SysproenerpProjectEstimationDataModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SysproenerpEntityModule {}
