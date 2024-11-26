import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/Student-dto';
import { UpdateDto } from './dto/update-dto';
import { Eligible } from './erigibility-entity'; // Adjust according to your entity structure

@Injectable()
export class ErigibleService {
  constructor(
    @InjectRepository(Eligible)
    private eligibleRepository: Repository<Eligible>,
  ) {}

  async checkEligibility(firstName: string, surName: string): Promise<{ isEligible: boolean }> {
    const student = await this.eligibleRepository.findOne({
      where: {
        FirstName: firstName,
        SurName: surName,
      },
    });

    // If the student is not found, return not eligible
    if (!student) {
      return { isEligible: false }; // Student not found
    }

    // Assuming you want to check against a predefined limit
    const predefinedTuitionLimit = 500000; // Example limit
    const predefinedUpkeepLimit = 300000;   // Example limit

    // Check if the tuition and upkeep are within the limits
    const totalAmount = predefinedTuitionLimit + predefinedUpkeepLimit;
    const isEligible = totalAmount <= student.tuition + student.upkeep;

    return { isEligible }; // Return eligibility status
  }

  // Create a new student entry
  async createStudent(createStudentDto: CreateStudentDto): Promise<Eligible> {
    const total = createStudentDto.tuition + createStudentDto.upkeep;
    const student = this.eligibleRepository.create({
      FirstName: createStudentDto.FirstName,
      SurName: createStudentDto.SurName,
      university: createStudentDto.university,
      tuition: createStudentDto.tuition, // Convert to number
      upkeep: createStudentDto.upkeep,    // Convert to number
      total: total,
    });

    return await this.eligibleRepository.save(student);
  }

  // Get all student entries
  async getAllStudents(): Promise<Eligible[]> {
    return await this.eligibleRepository.find();
  }

  // Get a student by ID
  async getStudentById(id: number): Promise<Eligible> {
    const student = await this.eligibleRepository.findOne({ where: { id } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  // Update a student entry by ID
  async updateStudent(id: number, updateStudentDto: UpdateDto): Promise<Eligible> {
    const student = await this.getStudentById(id); // Check if the student exists
    Object.assign(student, updateStudentDto);      // Update the student details

    return await this.eligibleRepository.save(student);
  }

  // Remove a student entry by ID
  async removeStudent(id: number): Promise<Eligible> {
    const student = await this.getStudentById(id); // Check if the student exists
    await this.eligibleRepository.remove(student);  // Remove the student from the database
    return student; // Return the removed student
  }
}
