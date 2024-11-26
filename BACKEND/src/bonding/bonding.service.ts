<<<<<<< HEAD
<<<<<<< HEAD
import { Injectable } from '@nestjs/common';

@Injectable()
export class BondingService {}
=======
=======
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBonding } from './dto/create-bonding';
import { UpdateBonding } from './dto/update-bonding';
import { Bonding } from './bonding-entity';
import { User } from '../users/Student.entity';
import { University } from '../university/University.entity';
import { EmailService } from '../mailer/mailer.service';


@Injectable()
export class BondingService {
  constructor(
    @InjectRepository(Bonding) private bondingRepository: Repository<Bonding>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(University) private readonly universityRepository: Repository<University>,
    private readonly emailService: EmailService,
  ) {}

  async createBonding(createBondingDto: CreateBonding, userId?: number): Promise<Bonding> {
    let user: User | null = null;

    if (userId) {
      user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const bonding = this.bondingRepository.create({
        ...createBondingDto,
        user: user || undefined,
    });

     const existingBonding = await this.bondingRepository.findOne({ where: { user: { id: userId } } }); 
     if (existingBonding) { 
      throw new BadRequestException(`You have already completed the bonding process.`);
     }
    }

    const bonding = this.bondingRepository.create({
      ...createBondingDto,
      user: user || undefined,
      firstName: createBondingDto.FirstName,
      surName: createBondingDto.SurName,
      dateOfBirth: createBondingDto.DateOfBirth,
      sex: createBondingDto.Sex,
      TA: createBondingDto.TA,
      NationalIdNo: createBondingDto.NationalIdNo,
      District: createBondingDto.District,
      PostalAddress: createBondingDto.PostalAddress,
      phoneNumber: createBondingDto.PhoneNumber,
      homeVillage: createBondingDto.HomeVillage,
      nationalId: createBondingDto.nationalId,
      studentId: createBondingDto.studentId,
      tuitionAmount: parseFloat(createBondingDto.Tuition || '0'),
      upkeepAmount: parseFloat(createBondingDto.UpkeepAmount || '0'),
      guardianFullName: createBondingDto.GuardianFullName,
      guardianPostalAddress: createBondingDto.GuardianPostalAddress,
      guardianPhysicalAddress: createBondingDto.GuardianPhysicalAddress,
      guardianHomeVillage: createBondingDto.GuardianHomeVillage,
      guardianDistrict: createBondingDto.GuardianDistrict,
      guardianOccupation: createBondingDto.GuardianOccupation,
      guardianPhoneNumber: createBondingDto.GuardianPhoneNumber,
      bankName: createBondingDto.BankName,
      branch: createBondingDto.Branch,
      accountName: createBondingDto.AccountName,
      accountNumber: createBondingDto.AccountNumber,
    });

    const university = await this.universityRepository.findOne({
      where: { id: createBondingDto.universityId },
    });
    if (!university) {
      throw new NotFoundException(`University with ID ${createBondingDto.universityId} not found`);
    }
    bonding.university = university;

    if (user) {
      await this.emailService.sendBondingSuccessEmail(user);
  }

    return await this.bondingRepository.save(bonding);
  }

  async getAllBondings(): Promise<Bonding[]> {
    return await this.bondingRepository.find();
  }

  async getBondingById(id: number): Promise<Bonding> {
    const bonding = await this.bondingRepository.findOne({ where: { id } });
    if (!bonding) {
      throw new NotFoundException(`Bonding with ID ${id} not found`);
    }
    return bonding;
  }

  async getBondingByUserId(userId: number): Promise<Bonding[]> {
    const userBondings = await this.bondingRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'university'],
    });
    if (userBondings.length === 0) {
      throw new NotFoundException(`No bonding entries found for user with ID ${userId}`);
    }
    return userBondings;
  }

  async hasUserBonded(userId: number): Promise<boolean> {
    const count = await this.bondingRepository.count({
      where: { user: { id: userId } },
    });
    return count > 0;
  }

  async updateBonding(id: number, updateBondingDto: UpdateBonding): Promise<Bonding> {
    const bonding = await this.getBondingById(id);
    Object.assign(bonding, updateBondingDto);
    return await this.bondingRepository.save(bonding);
  }

  async removeBonding(id: number): Promise<Bonding | null> {
    const bonding = await this.bondingRepository.findOne({
      where: { id },
      relations: ['university'],
    });

    if (!bonding) {
      throw new Error(`Bonding with ID ${id} not found`);
    }
    
    if (bonding?.university) {
      // Delete the associated university record
      await this.universityRepository.remove(bonding.university);
    }

    // Delete the bonding record
    return await this.bondingRepository.remove(bonding);
  }

}
<<<<<<< HEAD
>>>>>>> origin/JOEL-GANIZANI
=======
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
