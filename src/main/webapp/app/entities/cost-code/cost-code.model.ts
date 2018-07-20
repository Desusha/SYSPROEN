import { BaseEntity } from './../../shared';

export const enum CostCodeType {
    'LABOR',
    'MATERIAL',
    'EQUIPMENT',
    'SUBCONTRACTOR',
    'OTHER'
}

export class CostCode implements BaseEntity {
    constructor(
        public id?: number,
        public costCodeNo?: string,
        public name?: string,
        public description?: string,
        public costType?: CostCodeType,
    ) {
    }
}
