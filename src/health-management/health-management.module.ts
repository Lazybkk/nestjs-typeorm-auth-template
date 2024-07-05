import { Module } from '@nestjs/common';
import { HealthManagementController } from './health-management.controller';
import { HealthManagementService } from './health-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { MealsService } from './services/meals.service';
import { DiaryRecord } from './entities/diary-record.entity';
import { ExerciseRecord } from './entities/exercise-record.entity';
import { BodyRecord } from './entities/body-record.entity';
import { MealsController } from './controllers/meal.controllers';
import { BodyRecordsController } from './controllers/body-record.controllers';
import { BodyRecordService } from './services/body-record.service';
import { ExerciseRecordController } from './controllers/exercise-record.controllers';
import { ExerciseService } from './services/exercise-recod.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Meal,
      DiaryRecord,
      ExerciseRecord,
      DiaryRecord,
      BodyRecord,
    ]),
  ],
  controllers: [
    HealthManagementController,
    MealsController,
    BodyRecordsController,
    ExerciseRecordController,
  ],
  providers: [
    HealthManagementService,
    MealsService,
    BodyRecordService,
    ExerciseService,
  ],
})
export class HealthManagementModule {}
