import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommend } from './entities/recommend.entity';
import { CreateRecommendDto } from './dto/create-recommend-dto';

@Injectable()
export class RecommendService {
  constructor(
    @InjectRepository(Recommend)
    private recommendRepository: Repository<Recommend>,
  ) {}

  async create(createRecommendDto: CreateRecommendDto) {
    const createRecommend = await this.recommendRepository.create(
      createRecommendDto,
    );
    return await this.recommendRepository.save(createRecommend);
  }
  async findAll() {
    return this.recommendRepository.find();
  }
}
