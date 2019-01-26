import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsHexColor,
  IsEnum,
  IsDate,
} from 'class-validator';

export enum VehicleType {
  Motorcicle = 'Motociclos',
  Light = 'Ligeiros',
  Heavy = 'Pesados',
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
  @IsEnum(VehicleType)
  type?: VehicleType;

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
  @IsDate()
  expiresIn?: Date;
}
