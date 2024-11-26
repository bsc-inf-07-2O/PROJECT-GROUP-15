import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/Student-dto';
import { UpdateDto } from './dto/update-dto';
import { Eligible } from './erigibility-entity';
export declare class ErigibleService {
    private eligibleRepository;
    constructor(eligibleRepository: Repository<Eligible>);
    checkEligibility(firstName: string, surName: string): Promise<{
        isEligible: boolean;
    }>;
    createStudent(createStudentDto: CreateStudentDto): Promise<Eligible>;
    getAllStudents(): Promise<Eligible[]>;
    getStudentById(id: number): Promise<Eligible>;
    updateStudent(id: number, updateStudentDto: UpdateDto): Promise<Eligible>;
    removeStudent(id: number): Promise<Eligible>;
}
