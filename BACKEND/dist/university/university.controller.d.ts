import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { University } from './University.entity';
export declare class UniversityController {
    private readonly universityService;
    constructor(universityService: UniversityService);
    createUniversity(userId: number, createUniversityDto: CreateUniversityDto): Promise<University>;
    getAllUniversities(): Promise<University[]>;
    getUniversityById(id: number): Promise<University>;
    updateUniversity(id: number, updateUniversityDto: UpdateUniversityDto): Promise<University>;
    removeUniversity(id: number): Promise<University>;
}
