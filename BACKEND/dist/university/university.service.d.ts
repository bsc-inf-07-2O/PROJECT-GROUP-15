import { Repository } from 'typeorm';
import { University } from './University.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
export declare class UniversityService {
    private readonly universityRepository;
    constructor(universityRepository: Repository<University>);
    createUniversity(userId: number, createUniversityDto: CreateUniversityDto): Promise<University>;
    getAllUniversities(): Promise<University[]>;
    getUniversityById(id: number): Promise<University>;
    updateUniversity(id: number, updateUniversityDto: UpdateUniversityDto): Promise<University>;
    removeUniversity(id: number): Promise<University>;
}
