import { Module } from '@nestjs/common';
import { BondingService } from './bonding.service';
import { BondingController } from './bonding.controller';

@Module({
  providers: [BondingService],
  controllers: [BondingController]
})
export class BondingModule {}
