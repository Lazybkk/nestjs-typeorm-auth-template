import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../utils/entities/default.entity';
import { User } from '../../users/entities/user.entity';

@Entity('exercise_records')
export class ExerciseRecord extends DefaultEntity {
  @Column({
    name: 'durations',
  })
  durations: number;

  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'calories_burned',
  })
  caloriesBurned: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.exercises)
  user: User;
}
