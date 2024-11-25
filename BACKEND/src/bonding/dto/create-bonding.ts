import { IsString, IsNotEmpty, IsNumber, IsDate, IsEnum, IsEmail, IsOptional, IsIn } from 'class-validator';

export class CreateBonding {

  // Stage 1: Personal Details
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  FirstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Surname is required' })
  SurName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Date of birth is required' })
  DateOfBirth!: string;

  @IsEnum(['Male', 'Female'], { message: 'Sex must be either Male or Female' })
  @IsNotEmpty({ message: 'Sex is required' })
  Sex!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Phone number is required' })
  PhoneNumber!: number;

  @IsString()
  @IsNotEmpty({ message: 'Home village is required' })
  HomeVillage!: string;

  @IsString()
  @IsNotEmpty({ message: 'T/A is required' })
  TA!: string;

  @IsString()
  @IsNotEmpty({ message: 'District is required' })
  District!: string;

  @IsString()
  @IsNotEmpty({ message: 'postal is required' })
  PostalAddress!: string;

  @IsString()  
  @IsNotEmpty({ message: 'National ID Number is required' })
  NationalIdNo!: string;

  // Stage 2: Parents/Guardian Details
  @IsString()
  @IsOptional()
  GuardianFullName?: string;

  @IsString()
  @IsOptional()
  GuardianPostalAddress?: string;

  @IsString()
  @IsOptional()
  GuardianPhysicalAddress?: string;

  @IsString()
  @IsOptional()
  GuardianHomeVillage?: string;

  @IsString()
  @IsOptional()
  GuardianDistrict?: string;

  @IsString()
  @IsOptional()
  GuardianOccupation?: string;

  @IsString()
  @IsOptional()
  GuardianPhoneNumber?: string;

  // Stage 3: Bank Details
  @IsString()
  @IsOptional()
  BankName?: string;

  @IsString()
  @IsOptional()
  Branch?: string;

  @IsString()
  @IsOptional()
  AccountName?: string;

  @IsString()
  @IsOptional()
  AccountNumber?: string;

  // Stage 4: Documentation
  @IsString()
  @IsOptional()
  studentId?: string; // Path to the uploaded Student ID image

  @IsString()
  @IsOptional()
  nationalId?: string;// This would capture the file path or reference to the uploaded file.

  // Stage 5: Loan Amount Details

  @IsOptional()
  Tuition?: string;


  @IsOptional()
  UpkeepAmount?: string;

  @IsNumber()
  @IsOptional()
  universityId?: number;

 
}
