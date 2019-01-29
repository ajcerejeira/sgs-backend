import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
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

  @ApiModelPropertyOptional({
    type: 'number',
    isArray: true,
    example: [1, 3, 5],
  })
  @Column('int', { array: true, nullable: true })
  damages?: number[];

  @ApiModelProperty()
  @ManyToOne(type => VehicleMeta, meta => meta.vehicles, {
    onDelete: 'CASCADE',
  })
  meta: VehicleMeta;
}
