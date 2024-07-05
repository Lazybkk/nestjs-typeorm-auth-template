import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { MealsService } from '../services/meals.service';
import {
  CreateMealDto,
  DefaultColumnsResponse,
} from '../dto/meals/create-meal-dto';

@ApiTags('meals')
@UseGuards(JwtAuthGuard)
@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealsService) {}
  @ApiOperation({ summary: 'Insert Meal Infomation' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @Post()
  create(@Body() createMealDto: CreateMealDto) {
    return this.mealService.create(createMealDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.mealService.findAll();
  }
}
