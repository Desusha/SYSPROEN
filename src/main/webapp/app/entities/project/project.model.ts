import { BaseEntity } from './../../shared';

export const enum ProjectStatus {
    'UNSIGNED',
    'SIGNED',
    'CLOSED'
}

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public projectNo?: string,
        public name?: string,
        public description?: string,
        public startDate?: any,
        public endDate?: any,
        public status?: ProjectStatus,
        public phases?: BaseEntity[],
    ) {
    }
}
