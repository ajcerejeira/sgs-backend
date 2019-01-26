import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsHexColor,
  IsEnum,
  IsDate,
  IsDateString,
} from 'class-validator';
import { Accident } from '../accidents/accident.entity';

export enum VehicleType {
  Motorcicle = 'Motorcicle',
  Light = 'Light',
  Heavy = 'Heavy',
}

@Entity()
export class Vehicle {
  // Identification
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @IsString()
  register?: string;

  @Column({ nullable: true, enum: Object.keys(VehicleType) })
  @IsString()
  type?: string;

  // Brand
  @Column({ nullable: true })
  @IsString()
  make?: string;

  @Column({ nullable: true })
  @IsString()
  model?: string;

  @Column({ nullable: true, type: 'int' })
  @IsPositive()
  year?: number;

  @Column({ nullable: true })
  @IsHexColor()
  color?: string;

  // Insurance
  @Column({ nullable: true })
  @IsString()
  policy?: string;

  @Column({ nullable: true })
  @IsString()
  insurance?: string;

  @Column({ nullable: true })
  @IsDateString()
  expiresIn?: string;

  // Accident related
  @Column('int', { array: true, nullable: true })
  damages?: number[];

  @ManyToOne(type => Accident, accident => accident.vehicles, { onDelete: 'CASCADE' })
  accident: Accident;
}
