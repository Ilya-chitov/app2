import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity.js';

@Entity('animals')
export class Animal extends BaseEntity {
  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  breed: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @Column()
  gender: string;

  @Column({ nullable: true })
  motherId?: string;

  @Column({ nullable: true })
  fatherId?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @Column({ default: 'active' })
  status: string;

  // TODO: Add location, health records, weight tracking
}