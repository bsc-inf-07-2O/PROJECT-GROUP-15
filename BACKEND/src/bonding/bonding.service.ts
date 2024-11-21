import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBonding } from './dto/create-bonding'; // Adjust according to your structure
import { UpdateBonding } from './dto/update-bonding'; // Ensure this DTO is created
import { Bonding } from './bonding-entity'; // Adjust according to your entity structure
import { EmailService } from '../mailer/mailer.service';
import { User } from '../users/Student.entity'; 


@Injectable()
export class BondingService {
  constructor(
    @InjectRepository(Bonding)
    private bondingRepository: Repository<Bonding>,
    private readonly mailerService: EmailService,
  ) {}

  // Create a new bonding entry
  async createBonding(createBondingDto: CreateBonding): Promise<Bonding> {
    const bonding = this.bondingRepository.create({
      firstName: createBondingDto.FirstName,
      surName: createBondingDto.SurName,
      dateOfBirth: createBondingDto.DateOfBirth,
      sex: createBondingDto.Sex,
      TA: createBondingDto.TA,
      phoneNumber: createBondingDto.PhoneNumber,
      homeVillage: createBondingDto.HomeVillage,
      nationalIdNumber: createBondingDto.NationalIDNumber,
      nationalId : createBondingDto. nationalId,
      studentId : createBondingDto. studentId,
      tuitionAmount: parseFloat(createBondingDto.TuitionAmount || '0'), // Convert to number
      upkeepAmount: parseFloat(createBondingDto.UpkeepAmount || '0'), // Convert to number
      // Map additional fields as necessary
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
    await this.mailerService.sendBondingSuccessEmail(new User());
    return await this.bondingRepository.save(bonding);
  }

  // Get all bonding entries
  async getAllBondings(): Promise<Bonding[]> {
    return await this.bondingRepository.find();
  }

  // Get a bonding entry by ID
  async getBondingById(id: number): Promise<Bonding> {
    const bonding = await this.bondingRepository.findOne({ where: { id } });
    if (!bonding) {
      throw new NotFoundException(`Bonding with ID ${id} not found`);
    }
    return bonding;
  }

  // Update a bonding entry by ID
  async updateBonding(id: number, updateBondingDto: UpdateBonding): Promise<Bonding> {
    const bonding = await this.getBondingById(id); // Check if the bonding exists
    Object.assign(bonding, updateBondingDto); // Update the bonding details

    return await this.bondingRepository.save(bonding);
  }

  // Remove a bonding entry by ID
  async removeBonding(id: number): Promise<Bonding> {
    const bonding = await this.getBondingById(id); // Check if the bonding exists
    await this.bondingRepository.remove(bonding); // Remove the bonding from the database
    return bonding; // Return the removed bonding
  }
}
