import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { DefaultColumnsResponse } from '../dto/meals/create-meal-dto';
import { DiaryRecordService } from '../services/diary-record.service';
import { CreateDiaryDto } from '../dto/diary/create-diary-dto';

@ApiTags('diary-records')
@UseGuards(JwtAuthGuard)
@Controller('diary-records')
export class DiaryRecordsController {
  constructor(private readonly diaryRecordService: DiaryRecordService) {}
  @ApiOperation({ summary: 'Insert Diary Infomation' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @Post()
  create(@Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryRecordService.create(createDiaryDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.diaryRecordService.findAll();
  }
}
