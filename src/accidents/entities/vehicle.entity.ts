import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VehicleMeta } from './vehicle-meta.entity';
import { Accident } from './accident.entity';
import { Actor } from './actor.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty()
  @ManyToOne(type => VehicleMeta, meta => meta.vehicles, {
    onDelete: 'CASCADE',
  })
  meta: VehicleMeta;

  @ManyToOne(type => Accident, accident => accident.vehicles, {
    onDelete: 'CASCADE',
  })
  accident: Accident;

  @ApiModelPropertyOptional({
    type: 'number',
    isArray: true,
    example: [1, 3, 5],
  })
  @IsOptional()
  @Column('int', { array: true, nullable: true })
  damages?: number[];

  /*
  @ApiModelPropertyOptional()
  @IsOptional()
  @ManyToOne(type => Actor, { nullable: true, onDelete: 'CASCADE' })
  driver?: Actor;*/
}
