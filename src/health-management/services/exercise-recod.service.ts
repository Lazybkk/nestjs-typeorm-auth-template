import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseRecord } from '../entities/exercise-record.entity';
import { CreateExerciseDto } from '../dto/exercise/create-excercise-dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(ExerciseRecord)
    private exerciseRecordRepository: Repository<ExerciseRecord>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto) {
    const createMeal = await this.exerciseRecordRepository.create(
      createExerciseDto,
    );
    return await this.exerciseRecordRepository.save(createMeal);
  }
  async findAll() {
    return this.exerciseRecordRepository.find();
  }
}
