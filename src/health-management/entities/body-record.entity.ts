import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../utils/entities/default.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('body_records')
export class BodyRecord extends DefaultEntity {
  @Column({
    name: 'weight',
  })
  weight: number;

  @Column({
    name: 'height',
  })
  height: number;

  @Column({
    name: 'body_fat_percentage',
  })
  bodyFatPercentage: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.bodyRecords)
  user: User;
}
