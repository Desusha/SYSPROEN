import { BaseEntity } from './../../shared';

export class ProjectEstimation implements BaseEntity {
    constructor(
        public id?: number,
        public projectEstimationData?: BaseEntity[],
        public projectId?: number,
        public phaseId?: number,
    ) {
    }
}
