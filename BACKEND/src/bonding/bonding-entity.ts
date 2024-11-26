import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToOne } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';
import { User } from '../users/Student.entity'; 
import { University } from '../university/University.entity';

@Entity('bondings')
export class Bonding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-incrementing ID

  // Student Information
  @Column({ type: 'varchar', length: 100 })
  firstName!: string; // First name of the student

  @Column({ type: 'varchar', length: 100 })
  surName!: string; // Surname of the student

  @Column({ type: 'varchar' })
  dateOfBirth!: string; // Date of birth

  @Column({ type: 'varchar', length: 10 })
  sex!: string; // Gender (e.g., Male, Female)

  @Column({ type: 'bigint' }) // Use bigint for phone numbers to avoid size issues
  phoneNumber!: number;

  @Column({ type: 'varchar', length: 255 })
  homeVillage!: string; // Home village

  @Column({ type: 'varchar', length: 255 })
  TA!: string; // Traditional Authority

 @Column({ type: 'varchar', length: 255 })
  NationalIdNo!: string; // National ID

  @Column({ type: 'varchar', length: 255 })
  District!: string; // National ID

  @Column({ type: 'varchar', length: 255 })
  PostalAddress!: string; // National ID

  @IsString()
  @IsOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  studentId?: string; // Path to the uploaded Student ID image

  @IsString()
  @IsOptional()
  @Column({ type: 'varchar', length: 255, nullable: true })
  nationalId?: string; // Path or identifier of the uploaded document

  @Column({ type: 'numeric', precision: 10, scale: 2 }) // Use numeric for amounts
tuitionAmount!: number;

@Column({ type: 'numeric', precision: 10, scale: 2 })
upkeepAmount!: number;

  // Guardian Details
  @Column({ type: 'varchar', length: 255, nullable: true })
  guardianFullName?: string; // Guardian's full name

  @Column({ type: 'varchar', length: 255, nullable: true })
  guardianPostalAddress?: string; // Guardian's postal address

  @Column({ type: 'varchar', length: 255, nullable: true })
  guardianPhysicalAddress?: string; // Guardian's physical address

  @Column({ type: 'varchar', length: 255, nullable: true })
  guardianHomeVillage?: string; // Guardian's home village

  @Column({ type: 'varchar', length: 255, nullable: true })
  guardianDistrict?: string; // Guardian's district

  @Column({ type: 'varchar', length: 100, nullable: true })
  guardianOccupation?: string; // Guardian's occupation

  @Column({ type: 'int', nullable: true })
  guardianPhoneNumber?: number; // Guardian's phone number

  // Bank Details
  @Column({ type: 'varchar', length: 255, nullable: true })
  bankName?: string; // Bank name

  @Column({ type: 'varchar', length: 255, nullable: true })
  branch?: string; // Bank branch

  @Column({ type: 'varchar', length: 255, nullable: true })
  accountName?: string; // Account name

  @Column({ type: 'bigint', nullable: true })
accountNumber?: number;

  @ManyToOne(() => University, (university) => university.bondings, { onDelete: 'CASCADE', eager: true }) 
  university!: University;
  
  @ManyToOne(() => User, (user) => user.bondings, { onDelete: 'CASCADE', eager: true })
    user!: User;
}
