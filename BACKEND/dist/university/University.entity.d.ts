import { BaseEntity } from 'typeorm';
import { Bonding } from '../bonding/bonding-entity';
export declare class University extends BaseEntity {
    id: number;
    University: string;
    ProgramOfStudy: string;
    email: string;
    YearOfStudy: string;
    RegNo: string;
    bondings: Bonding[];
}
