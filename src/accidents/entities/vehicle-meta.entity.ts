import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {
  IsDateString,
  IsHexColor,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { Vehicle } from './vehicle.entity';

@Entity()
export class VehicleMeta {
  @PrimaryGeneratedColumn()
  id: number;

  // Identification
  @ApiModelPropertyOptional({ example: '25-33-XQ' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true, unique: true })
  register?: string;

  @ApiModelPropertyOptional({ type: 'string' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  type?: string;

  // Brand
  @ApiModelPropertyOptional({ example: 'Ford' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  make?: string;

  @ApiModelPropertyOptional({ example: 'Focus' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  model?: string;

  @ApiModelPropertyOptional({ format: 'int', example: 2004 })
  @IsPositive()
  @IsOptional()
  @Column({ type: 'int', nullable: true })
  year?: number;

  @ApiModelPropertyOptional({ example: '#ffffff' })
  @IsHexColor()
  @IsOptional()
  @Column({ nullable: true })
  color?: string;

  // Insurance
  @ApiModelPropertyOptional({ example: '1092635146' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  policy?: string;

  @ApiModelPropertyOptional({ example: 'Allianz' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  insurance?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  @Column({ nullable: true })
  expirationDate?: Date;

  // Vehicles in accidents that have this meta information
  @OneToMany(type => Vehicle, vehicle => vehicle.meta)
  vehicles: Vehicle[];
}
