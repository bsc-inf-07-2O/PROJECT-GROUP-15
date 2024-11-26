<<<<<<< HEAD
import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany, OneToOne, JoinColumn } from 'typeorm';
//import * as bcrypt from 'bcrypt';
import { Bonding } from '../bonding/bonding-entity';


@Entity('university') // Ensure this matches your database table name
export class University extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: 'The  identifier',
    })
    id!: number; // Auto-incrementing ID

    @Column({
        type: 'varchar',
        length: 100,
    })
    University!: string; 

    @Column({
        type: 'varchar',
        length: 100,
        
    })
    ProgramOfStudy!: string;

    @Column({
        type: 'varchar',
        length: 100,
        
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 100,
       
    })
    YearOfStudy!: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    RegNo!: string;
    
    // One-to-one relationship with Bonding entity
    @OneToMany(() => Bonding, (bonding) => bonding.university) 
    bondings!: Bonding[];
}
=======
import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany, OneToOne, JoinColumn } from 'typeorm';
//import * as bcrypt from 'bcrypt';
import { Bonding } from '../bonding/bonding-entity';


@Entity('university') // Ensure this matches your database table name
export class University extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: 'The  identifier',
    })
    id!: number; 

    @Column({
        type: 'varchar',
        length: 100,
    })
    University!: string; 

    @Column({
        type: 'varchar',
        length: 100,
        
    })
    ProgramOfStudy!: string;

    @Column({
        type: 'varchar',
        length: 100,
        
    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 100,
       
    })
    YearOfStudy!: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
    })
    RegNo!: string;
    
    // One-to-one relationship with Bonding entity
    @OneToMany(() => Bonding, (bonding) => bonding.university) 
    bondings!: Bonding[];
}
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
