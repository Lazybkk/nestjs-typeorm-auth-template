import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { Role } from '../../auth/models/roles.model';
import { DefaultEntity } from '../../utils/entities/default.entity';
import { Exclude } from 'class-transformer';
import { Meal } from '../../health-management/entities/meal.entity';
import { DiaryRecord } from '../../health-management/entities/diary-record.entity';
import { BodyRecord } from '../../health-management/entities/body-record.entity';
import { ExerciseRecord } from '../../health-management/entities/exercise-record.entity';

@Entity('users')
export class User extends DefaultEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @Column({ select: false, nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CUSTOMER,
  })
  role: Role;

  @OneToMany(() => Meal, (meal) => meal.user)
  meals: Meal[];

  @OneToMany(() => DiaryRecord, (diary) => diary.user)
  diaryRecords: DiaryRecord[];

  @OneToMany(() => BodyRecord, (bodyRecord) => bodyRecord.user)
  bodyRecords: BodyRecord[];

  @OneToMany(() => ExerciseRecord, (exercise) => exercise.user)
  exercises: ExerciseRecord[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
