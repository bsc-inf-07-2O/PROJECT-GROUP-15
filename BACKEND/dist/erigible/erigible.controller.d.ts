import { ErigibleService } from './erigible.service';
import { CreateStudentDto } from './dto/Student-dto';
import { UpdateDto } from './dto/update-dto';
import { Eligible } from './erigibility-entity';
export declare class ErigibleController {
    private readonly erigibleService;
    constructor(erigibleService: ErigibleService);
    createStudent(createStudentDto: CreateStudentDto): Promise<Eligible>;
    getAllStudents(): Promise<Eligible[]>;
    getStudentById(id: number): Promise<Eligible>;
    updateStudent(id: number, updateStudentDto: UpdateDto): Promise<Eligible>;
    removeStudent(id: number): Promise<Eligible>;
    checkEligibility(body: {
        FirstName: string;
        SurName: string;
    }): Promise<{
        isEligible: boolean;
    }>;
}
