import { Entity, Column, OneToOne } from 'typeorm';
import { Dependent } from './dependent.entity';
import { DefaultEntity } from '../../utils/entities/default.entity';

@Entity()
export class LegalDocument extends DefaultEntity {
  @Column()
  documentType: string;

  @Column()
  filePath: string;

  @OneToOne(() => Dependent, (dependent) => dependent.legalDocument)
  dependent: Dependent;
}
