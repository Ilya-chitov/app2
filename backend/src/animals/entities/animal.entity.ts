import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('animals')
export class Animal extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  tag?: string;

  @Column({ nullable: true })
  species?: string;

  @Column({ nullable: true })
  breed?: string;
}
