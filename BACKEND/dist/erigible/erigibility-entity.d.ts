import { BaseEntity } from 'typeorm';
export declare class Eligible extends BaseEntity {
    id: number;
    FirstName: string;
    SurName: string;
    university: string;
    tuition: number;
    upkeep: number;
    total: number;
}
