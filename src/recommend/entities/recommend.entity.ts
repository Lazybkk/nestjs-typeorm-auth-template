import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../utils/entities/default.entity';
import { RECOMMENDCATEGORY } from '../enum/recommend.enum';

@Entity('recommends')
export class Recommend extends DefaultEntity {
  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'description',
  })
  description: string;

  @Column('text', {
    name: 'hash_tags',
    array: true,
  })
  hashTags: string[];

  @Column({
    type: 'enum',
    enum: RECOMMENDCATEGORY,
    default: RECOMMENDCATEGORY.COLUMN,
    name: 'recommend_category',
  })
  recommendCategory: string;
}
