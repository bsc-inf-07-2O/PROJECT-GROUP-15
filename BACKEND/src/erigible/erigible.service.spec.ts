import { Test, TestingModule } from '@nestjs/testing';
import { ErigibleService } from './erigible.service';

describe('ErigibleService', () => {
  let service: ErigibleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErigibleService],
    }).compile();

    service = module.get<ErigibleService>(ErigibleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
