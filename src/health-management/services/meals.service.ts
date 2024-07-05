import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/meal.entity';
import { CreateMealDto } from '../dto/meals/create-meal-dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealRepository: Repository<Meal>,
  ) {}

  async create(createMealDto: CreateMealDto) {
    const createMeal = await this.mealRepository.create(createMealDto);
    return await this.mealRepository.save(createMeal);
  }
  async findAll() {
    return this.mealRepository.find();
  }
}
