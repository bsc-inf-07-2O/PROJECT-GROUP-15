import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { University } from './University.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async createUniversity(userId: number, createUniversityDto: CreateUniversityDto): Promise<University> {
    const university = this.universityRepository.create(createUniversityDto);
    return await this.universityRepository.save(university);
  }

  async getAllUniversities(): Promise<University[]> {
    return await this.universityRepository.find({ relations: ['bondings'] });
  }

  async getUniversityById(id: number): Promise<University> {
    const university = await this.universityRepository.findOne({ where: { id }, relations: ['bondings'] });
    if (!university) {
      throw new NotFoundException(`University with ID ${id} not found`);
    }
    return university;
  }

  async updateUniversity(id: number, updateUniversityDto: UpdateUniversityDto): Promise<University> {
    const university = await this.getUniversityById(id);
    Object.assign(university, updateUniversityDto);
    return await this.universityRepository.save(university);
  }

  async removeUniversity(id: number): Promise<University> {
    const university = await this.getUniversityById(id);
    await this.universityRepository.remove(university);
    return university;
  }
}
