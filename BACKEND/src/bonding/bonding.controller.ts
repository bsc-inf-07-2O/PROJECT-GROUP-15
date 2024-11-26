<<<<<<< HEAD
import { Controller } from '@nestjs/common';

@Controller('bonding')
export class BondingController {}
=======
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BondingService } from './bonding.service';
import { CreateBonding } from './dto/create-bonding';
import { UpdateBonding } from './dto/update-bonding';
import { Bonding } from './bonding-entity';
import { CreateUniversityDto } from '../university/dto/create-university.dto';
import { UniversityService } from '../university/university.service';

@Controller('bonding')
export class BondingController {
  constructor(
    private readonly bondingService: BondingService,
    private readonly universityService: UniversityService, // Inject UniversityService
  ) {}

  @Post('/register/user/:userId')
  async createBondingForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(ValidationPipe) createBondingDto: CreateBonding,
    @Body(ValidationPipe) universityData: CreateUniversityDto,
  ): Promise<Bonding | { message: string }> {
    // Check if the user is already bonded
    const hasBonded = await this.bondingService.hasUserBonded(userId);
    if (hasBonded) {
      return { message: 'User has already completed bonding.' };
    }

    // Proceed with bonding if not already bonded
    const university = await this.universityService.createUniversity(userId, universityData);
    createBondingDto.universityId = university.id;

    const bonding = await this.bondingService.createBonding(createBondingDto, userId);
    return bonding;
  }

  @Get('/user/:userId')
  async getBondingByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Bonding[]> {
    return await this.bondingService.getBondingByUserId(userId);
  }

  @Put(':id')
  async updateBonding(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBondingDto: UpdateBonding,
  ): Promise<Bonding> {
    return await this.bondingService.updateBonding(id, updateBondingDto);
  }

  @Delete(':id')
  async removeBonding(@Param('id', ParseIntPipe) id: number): Promise<Bonding | null> {
    return await this.bondingService.removeBonding(id);
  }
}
>>>>>>> origin/JOEL-GANIZANI
