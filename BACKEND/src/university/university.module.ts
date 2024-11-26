<<<<<<< HEAD
import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { UniversityService } from './university.service';

@Module({
  providers: [UniversityService]
=======
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { University } from './University.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([University])],
  controllers: [UniversityController],
  providers: [UniversityService],
  exports: [TypeOrmModule, UniversityService],
>>>>>>> origin/JOEL-GANIZANI
})
export class UniversityModule {}
=======
import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { University } from './University.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([University])],
  controllers: [UniversityController],
  providers: [UniversityService],
  exports: [TypeOrmModule, UniversityService],
})
//university module
export class UniversityModule {}
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
