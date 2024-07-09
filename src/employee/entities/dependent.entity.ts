import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Employee } from './employee.entity';
import { DefaultEntity } from '../../utils/entities/default.entity';
import { LegalDocument } from './legal-document.entity';

@Entity()
export class Dependent extends DefaultEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: ['Spouse', 'Child', 'Parent', 'Other'],
    default: 'Other',
  })
  relationship: 'Spouse' | 'Child' | 'Parent' | 'Other';

  @ManyToOne(() => Employee, (employee) => employee.dependents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employeeId' }) // Specify the foreign key column name
  employee: Employee;

  @OneToOne(() => LegalDocument, (legalDocument) => legalDocument.dependent, {
    cascade: true,
  })
  legalDocument: LegalDocument;
}
