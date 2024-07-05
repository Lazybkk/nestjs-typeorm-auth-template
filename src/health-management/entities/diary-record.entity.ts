import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from '../../utils/entities/default.entity';
import { User } from '../../users/entities/user.entity';

@Entity('diary_record')
export class DiaryRecord extends DefaultEntity {
  @Column({
    name: 'content',
  })
  content: string;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.diaryRecords)
  user: User;
}
