import { Module } from '@nestjs/common';
import { BondingService } from './bonding.service';
import { BondingController } from './bonding.controller';
<<<<<<< HEAD
<<<<<<< HEAD

@Module({
  providers: [BondingService],
  controllers: [BondingController]
=======
=======
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonding } from './bonding-entity';
import { UsersModule } from '../users/users.module';
import { UniversityModule } from '../university/university.module';
import { User } from '../users/Student.entity';
import { University } from '../university/University.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bonding, User, University]),
    UsersModule,
    UniversityModule,
  ],
  providers: [BondingService],
  controllers: [BondingController],
<<<<<<< HEAD
>>>>>>> origin/JOEL-GANIZANI
=======
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
})
export class BondingModule {}
