import { Column, Entity, ManyToOne } from 'typeorm';
import { MEALTYPE } from '../enum/meal.enum';
import { DefaultEntity } from '../../utils/entities/default.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('meals')
export class Meal extends DefaultEntity {
  @Column({
    type: 'enum',
    enum: MEALTYPE,
    default: MEALTYPE.MORNING,
    name: 'meal_type',
  })
  mealType: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'calories',
  })
  calories: number;

  @Column({
    name: 'image_url',
  })
  imageURL: string;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.meals)
  user: User;
}
