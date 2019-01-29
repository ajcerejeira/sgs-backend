import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  OneToOne,
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

  @ApiModelProperty()
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

  @ApiModelPropertyOptional()
  @IsOptional()
  @OneToOne(type => Actor, actor => actor.vehicle, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  driver?: Actor;

  @ApiModelPropertyOptional({ type: Actor, isArray: true })
  @IsOptional()
  @OneToMany(type => Actor, actor => actor.vehicle, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  passengers?: Actor[];
}
