import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDiaryDto } from '../dto/diary/create-diary-dto';
import { DiaryRecord } from '../entities/diary-record.entity';

@Injectable()
export class DiaryRecordService {
  constructor(
    @InjectRepository(DiaryRecord)
    private mealRepository: Repository<DiaryRecord>,
  ) {}

  async create(createDiaryDto: CreateDiaryDto) {
    const createMeal = await this.mealRepository.create(createDiaryDto);
    return await this.mealRepository.save(createMeal);
  }
  async findAll() {
    return this.mealRepository.find();
  }
}
