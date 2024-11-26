import { Module } from '@nestjs/common';
import { ErigibleController } from './erigible.controller';
import { ErigibleService } from './erigible.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Eligible } from './erigibility-entity';


@Module({
  controllers: [ErigibleController],
  imports: [TypeOrmModule.forFeature([Eligible])],
  providers: [ErigibleService]
})
export class ErigibleModule {}
