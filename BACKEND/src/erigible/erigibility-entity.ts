import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('eligible_students') // Specify the table name
export class Eligible extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number; // Auto-incrementing ID for each student

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false, // Ensure FirstName cannot be null
  })
  FirstName!: string; // First name of the student

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false, // Ensure SurName cannot be null
  })
  SurName!: string; // Last name of the student

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false, // Ensure university cannot be null
  })
  university!: string; // University name

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false, // Ensure tuition cannot be null
  })
  tuition!: number; // Tuition amount

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false, // Ensure upkeep cannot be null
  })
  upkeep!: number; // Upkeep amount

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false, // Ensure total cannot be null
  })
  total!: number; // Total amount (tuition + upkeep)
}
