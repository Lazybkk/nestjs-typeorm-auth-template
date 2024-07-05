import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RecommendService } from './recommend.service';
import {
  CreateRecommendDto,
  DefaultColumnsResponse,
} from './dto/create-recommend-dto';

@ApiTags('recommend')
@Controller('recommend')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @ApiOperation({ summary: 'Insert Recommend Infomation' })
  @ApiResponse({
    status: 201,
    type: DefaultColumnsResponse,
  })
  @Post()
  create(@Body() createRecommendDto: CreateRecommendDto) {
    return this.recommendService.create(createRecommendDto);
  }

  @ApiResponse({
    status: 200,
    isArray: true,
    type: DefaultColumnsResponse,
  })
  @Get()
  findAll() {
    return this.recommendService.findAll();
  }
}
