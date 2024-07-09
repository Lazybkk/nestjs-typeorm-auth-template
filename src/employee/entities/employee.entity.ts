import { Entity, Column, OneToMany } from 'typeorm';
import { Dependent } from './dependent.entity';
import { DefaultEntity } from '../../utils/entities/default.entity';

@Entity()
export class Employee extends DefaultEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'] })
  gender: 'Male' | 'Female' | 'Other';

  @Column()
  jobTitle: string;

  @Column()
  department: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column({
    type: 'enum',
    enum: ['Active', 'Terminated', 'OnLeave'],
    default: 'Active',
  })
  status: 'Active' | 'Terminated' | 'OnLeave';

  @OneToMany(() => Dependent, (dependent) => dependent.employee, {
    cascade: true,
  })
  dependents: Dependent[];
}
