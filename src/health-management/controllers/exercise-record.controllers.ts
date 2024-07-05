import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ExerciseService } from '../services/exercise-recod.service';
import {
  CreateExerciseDto,
  DefaultColumnsResponse,
} from '../dto/exercise/create-excercise-dto';

@ApiTags('exercise-records')
@UseGuards(JwtAuthGuard)
@Controller('exercise-records')
export class ExerciseRecordController {
  constructor(private readonly exerciseRecordService: ExerciseService) {}
  @ApiOperation({ summary: 'Insert Exercise Infomation' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseRecordService.create(createExerciseDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.exerciseRecordService.findAll();
  }
}
