import { BaseEntity } from './../../shared';

export class ProjectEstimationData implements BaseEntity {
    constructor(
        public id?: number,
        public numberOfUnit?: number,
        public unitPrice?: number,
        public totalPrice?: number,
        public costCodeId?: number,
        public projectId?: number,
    ) {
    }
}
