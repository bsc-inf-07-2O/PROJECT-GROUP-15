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
