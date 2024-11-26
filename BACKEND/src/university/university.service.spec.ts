<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { UniversityService } from './university.service';

describe('UniversityService', () => {
  let service: UniversityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversityService],
    }).compile();

    service = module.get<UniversityService>(UniversityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
=======
import { Test, TestingModule } from '@nestjs/testing';
import { UniversityService } from './university.service';
//spec
describe('UniversityService', () => {
  let service: UniversityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniversityService],
    }).compile();

    service = module.get<UniversityService>(UniversityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
