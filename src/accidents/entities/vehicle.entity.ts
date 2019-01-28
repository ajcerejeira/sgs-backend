import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { VehicleMeta } from './vehicle-meta.entity';
import { Accident } from './accident.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Accident, accident => accident.vehicles, {
    onDelete: 'CASCADE',
  })
  accident: Accident;

  @Column('int', { array: true, nullable: true })
  damages?: number[];

  @ManyToOne(type => VehicleMeta, meta => meta.vehicles, {
    onDelete: 'CASCADE',
  })
  meta: VehicleMeta;
}
