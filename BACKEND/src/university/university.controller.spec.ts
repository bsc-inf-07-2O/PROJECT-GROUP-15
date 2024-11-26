<<<<<<< HEAD
import { Test, TestingModule } from '@nestjs/testing';
import { UniversityController } from './university.controller';

describe('UniversityController', () => {
  let controller: UniversityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityController],
    }).compile();

    controller = module.get<UniversityController>(UniversityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
=======
import { Test, TestingModule } from '@nestjs/testing';
import { UniversityController } from './university.controller';

describe('UniversityController', () => {
  let controller: UniversityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniversityController],
    }).compile();

    controller = module.get<UniversityController>(UniversityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
//university
>>>>>>> cb1368fd7492417344ad1d194a6ef3581f993036
