import { Module } from '@nestjs/common';
import { BondingService } from './bonding.service';
import { BondingController } from './bonding.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bonding } from './bonding-entity';
import { UsersModule } from '../users/users.module';
import { UniversityModule } from '../university/university.module';
import { User } from '../users/Student.entity';
import { University } from '../university/University.entity';
import { mailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bonding, User, University]),
    UsersModule,
    UniversityModule,
    mailerModule,
    
  ],
  providers: [BondingService],
  controllers: [BondingController],
})
export class BondingModule {}
