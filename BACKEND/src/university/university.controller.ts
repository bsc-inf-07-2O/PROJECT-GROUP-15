import { Controller, Post, Get, Put, Delete, Param, Body, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { University } from './University.entity';
//controller
@Controller('university')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Post(':userId')
  async createUniversity(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) createUniversityDto: CreateUniversityDto,
  ): Promise<University> {
    return await this.universityService.createUniversity(userId, createUniversityDto);
  }
  
  @Get()
  async getAllUniversities(): Promise<University[]> {
    return await this.universityService.getAllUniversities();
  }

  @Get(':id')
  async getUniversityById(@Param('id', ParseIntPipe) id: number): Promise<University> {
    return await this.universityService.getUniversityById(id);
  }

  @Put(':id')
  async updateUniversity(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUniversityDto: UpdateUniversityDto,
  ): Promise<University> {
    return await this.universityService.updateUniversity(id, updateUniversityDto);
  }

  @Delete(':id')
  async removeUniversity(@Param('id', ParseIntPipe) id: number): Promise<University> {
    return await this.universityService.removeUniversity(id);
  }
}
