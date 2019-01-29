import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { Vehicle } from './vehicle.entity';
import { Accident } from './accident.entity';

export enum Role {
  Driver = 'Driver',
  Passenger = 'Passenger',
  Pedestrian = 'Pedestrian',
  Witness = 'Witness',
}

export enum Wounds {
  None = 'None',
  Light = 'Light',
  Medium = 'Medium',
  Severe = 'Severe',
  Death = 'Death',
}

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelPropertyOptional()
  @ManyToOne(type => Person)
  person: Person;

  @ApiModelProperty()
  @ManyToOne(type => Accident, { onDelete: 'CASCADE' })
  accident: Accident;

  @ApiModelPropertyOptional({ enum: Object.keys(Role), example: Role.Witness })
  @IsEnum(Role)
  @IsOptional()
  @Column({ enum: Role, nullable: true })
  role?: Role;

  // @ApiModelPropertyOptional()
  @IsOptional()
  @ManyToOne(type => Vehicle, { nullable: true, onDelete: 'CASCADE' })
  vehicle?: Vehicle;

  @ApiModelPropertyOptional({
    enum: Object.keys(Wounds),
    example: Wounds.Medium,
  })
  @IsEnum(Wounds)
  @IsOptional()
  @Column({ enum: Wounds, nullable: true })
  wounds?: Wounds;
}
