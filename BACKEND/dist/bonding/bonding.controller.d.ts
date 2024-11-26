import { BondingService } from './bonding.service';
import { CreateBonding } from './dto/create-bonding';
import { UpdateBonding } from './dto/update-bonding';
import { Bonding } from './bonding-entity';
import { CreateUniversityDto } from '../university/dto/create-university.dto';
import { UniversityService } from '../university/university.service';
export declare class BondingController {
    private readonly bondingService;
    private readonly universityService;
    constructor(bondingService: BondingService, universityService: UniversityService);
    createBondingForUser(userId: number, createBondingDto: CreateBonding, universityData: CreateUniversityDto): Promise<Bonding | {
        message: string;
    }>;
    getBondingByUserId(userId: number): Promise<Bonding[]>;
    updateBonding(id: number, updateBondingDto: UpdateBonding): Promise<Bonding>;
    removeBonding(id: number): Promise<Bonding | null>;
}
