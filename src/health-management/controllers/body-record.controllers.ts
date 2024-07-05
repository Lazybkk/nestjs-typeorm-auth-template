import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { BodyRecordService } from '../services/body-record.service';
import {
  CreateBodyRecordDto,
  DefaultColumnsResponse,
} from '../dto/body/create-body-dto';

@ApiTags('body-records')
@UseGuards(JwtAuthGuard)
@Controller('body-records')
export class BodyRecordsController {
  constructor(private readonly bodyRecordService: BodyRecordService) {}
  @ApiOperation({ summary: 'Insert Body infomation' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @Post()
  create(@Body() createBodyRecordDto: CreateBodyRecordDto) {
    return this.bodyRecordService.create(createBodyRecordDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultColumnsResponse,
  })
  @ApiBearerAuth('access-token')
  @Get()
  findAll() {
    return this.bodyRecordService.findAll();
  }
}
