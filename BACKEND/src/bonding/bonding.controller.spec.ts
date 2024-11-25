import { Test, TestingModule } from '@nestjs/testing';
import { BondingController } from './bonding.controller';

describe('BondingController', () => {
  let controller: BondingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BondingController],
    }).compile();

    controller = module.get<BondingController>(BondingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
