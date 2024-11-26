import {
  Column,
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Bonding } from '../bonding/bonding-entity';

@Entity('Student') // Ensure this matches your database table name
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The bank identifier',
  })
  id!: number; // Auto-incrementing ID

  @Column({
    type: 'varchar',
    length: 100,
  })
  RegNo!: string; // Registration Number

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  FirstName!: string; // First name

  @Column({
    type: 'varchar',
    length: 100,
  })
  SurName!: string; // Surname

  @Column({
    type: 'varchar',
    length: 100,
  })
  University!: string; // University name

  @Column({
    type: 'varchar',
    unique: true,
  })
  email!: string; // Email address

  @Column({
    type: 'varchar',
    length: 400,
  })
  password!: string;

  @Column({ nullable: true })
  resetPasswordToken!: string;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profileImage?: string; // Path for profile image

  @OneToMany(() => Bonding, (bonding) => bonding.user)
  bondings!: Bonding[];
}
