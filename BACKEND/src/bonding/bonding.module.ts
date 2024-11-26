import { Module } from '@nestjs/common';
import { BondingService } from './bonding.service';
import { BondingController } from './bonding.controller';
<<<<<<< HEAD

@Module({
  providers: [BondingService],
  controllers: [BondingController]
=======
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
>>>>>>> origin/JOEL-GANIZANI
})
export class BondingModule {}
