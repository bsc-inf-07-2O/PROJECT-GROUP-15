import { Test, TestingModule } from '@nestjs/testing';
import { ErigibleController } from './erigible.controller';

describe('ErigibleController', () => {
  let controller: ErigibleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErigibleController],
    }).compile();

    controller = module.get<ErigibleController>(ErigibleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
