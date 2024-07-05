import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MealsService } from './services/meals.service';

@ApiTags('health-management')
@UseGuards(JwtAuthGuard)
@Controller('health-management')
export class HealthManagementController {
  constructor(private readonly mealService: MealsService) {}
}
