import { BaseEntity } from 'typeorm';
import { Bonding } from '../bonding/bonding-entity';
export declare class User extends BaseEntity {
    id: number;
    RegNo: string;
    FirstName: string;
    SurName: string;
    University: string;
    email: string;
    password: string;
    profileImage?: string;
    bondings: Bonding[];
}
