import { Test, TestingModule } from '@nestjs/testing';
import { HealthManagementController } from './health-management.controller';

describe('HealthManagementController', () => {
  let controller: HealthManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthManagementController],
    }).compile();

    controller = module.get<HealthManagementController>(
      HealthManagementController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
