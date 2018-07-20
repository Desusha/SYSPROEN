import { BaseEntity } from './../../shared';

export class Phase implements BaseEntity {
    constructor(
        public id?: number,
        public phaseNo?: string,
        public name?: string,
        public description?: string,
        public order?: number,
        public projectId?: number,
    ) {
    }
}
