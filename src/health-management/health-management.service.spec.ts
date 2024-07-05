import { Test, TestingModule } from '@nestjs/testing';
import { HealthManagementService } from './health-management.service';

describe('HealthManagementService', () => {
  let service: HealthManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthManagementService],
    }).compile();

    service = module.get<HealthManagementService>(HealthManagementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
