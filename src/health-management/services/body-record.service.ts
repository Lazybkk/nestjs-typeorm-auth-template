import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBodyRecordDto } from '../dto/body/create-body-dto';
import { BodyRecord } from '../entities/body-record.entity';

@Injectable()
export class BodyRecordService {
  constructor(
    @InjectRepository(BodyRecord)
    private mealRepository: Repository<BodyRecord>,
  ) {}

  async create(createBodyRecordDto: CreateBodyRecordDto) {
    const createMeal = await this.mealRepository.create(createBodyRecordDto);
    return await this.mealRepository.save(createMeal);
  }
  async findAll() {
    return this.mealRepository.find();
  }
}
