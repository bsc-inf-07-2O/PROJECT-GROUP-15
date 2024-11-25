import { Test, TestingModule } from '@nestjs/testing';
import { BondingService } from './bonding.service';

describe('BondingService', () => {
  let service: BondingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BondingService],
    }).compile();

    service = module.get<BondingService>(BondingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
