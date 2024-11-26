import { Repository } from 'typeorm';
import { CreateBonding } from './dto/create-bonding';
import { UpdateBonding } from './dto/update-bonding';
import { Bonding } from './bonding-entity';
import { User } from '../users/Student.entity';
import { University } from '../university/University.entity';
export declare class BondingService {
    private bondingRepository;
    private readonly userRepository;
    private readonly universityRepository;
    constructor(bondingRepository: Repository<Bonding>, userRepository: Repository<User>, universityRepository: Repository<University>);
    createBonding(createBondingDto: CreateBonding, userId?: number): Promise<Bonding>;
    getAllBondings(): Promise<Bonding[]>;
    getBondingById(id: number): Promise<Bonding>;
    getBondingByUserId(userId: number): Promise<Bonding[]>;
    hasUserBonded(userId: number): Promise<boolean>;
    updateBonding(id: number, updateBondingDto: UpdateBonding): Promise<Bonding>;
    removeBonding(id: number): Promise<Bonding | null>;
}
