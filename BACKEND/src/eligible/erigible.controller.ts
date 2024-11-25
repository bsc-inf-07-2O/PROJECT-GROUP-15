import { 
    Controller, 
    Post, 
    Get, 
    Put, 
    Delete, 
    Param, 
    Body, 
    ValidationPipe 
} from '@nestjs/common';
import { ErigibleService } from './erigible.service';
import { CreateStudentDto } from './dto/Student-dto';  // Ensure this DTO is created
import { UpdateDto } from './dto/update-dto';
import { Eligible } from './erigibility-entity';  // Adjust according to your entity structure

@Controller('erigible')
export class ErigibleController {
    constructor(private readonly erigibleService: ErigibleService) {}

    // Create a new student who is eligible for a loan
    @Post('/register')
    async createStudent(
        @Body(ValidationPipe) createStudentDto: CreateStudentDto,
    ): Promise<Eligible> {
        return await this.erigibleService.createStudent(createStudentDto);
    }

    // Get all eligible students
    @Get()
    async getAllStudents(): Promise<Eligible[]> {
        return await this.erigibleService.getAllStudents();
    }

    // Get a student by ID
    @Get(':id')
    async getStudentById(@Param('id') id: number): Promise<Eligible> {
        return await this.erigibleService.getStudentById(id);
    }

    // Update a student record by ID
    @Put(':id')
    async updateStudent(
        @Param('id') id: number, 
        @Body(ValidationPipe) updateStudentDto: UpdateDto,
    ): Promise<Eligible> {
        return await this.erigibleService.updateStudent(id, updateStudentDto);
    }

    // Remove a student record by ID
    @Delete(':id')
    async removeStudent(@Param('id') id: number): Promise<Eligible> {
        return await this.erigibleService.removeStudent(id);
    }

    // Check eligibility for a student based on FirstName and SurName
    @Post('/check')
    async checkEligibility(
        @Body(ValidationPipe) body: { 
            FirstName: string; 
            SurName: string; 
        }
    ): Promise<{ isEligible: boolean }> {
        return await this.erigibleService.checkEligibility(
            body.FirstName, 
            body.SurName
        );
    }
}
