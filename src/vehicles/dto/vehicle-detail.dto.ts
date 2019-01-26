import {
  IsString,
  IsNumber,
  IsPositive,
  IsHexColor,
  IsEnum,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Vehicle, VehicleType } from '../vehicle.entity';

export class VehicleDetailDto {
  // Identification
  @IsNumber()
  @ApiModelProperty()
  id: number;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  register?: string;

  @IsEnum(VehicleType)
  @IsOptional()
  @ApiModelPropertyOptional({ enum: VehicleType })
  type?: VehicleType;

  // Brand
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Ford' })
  make?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Focus' })
  model?: string;

  @IsPositive()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'int32', example: 2004 })
  year?: number;

  @IsHexColor()
  @IsOptional()
  @ApiModelPropertyOptional({ example: '#ffffff' })
  color?: string;

  // Insurance
  @IsString()
  @ApiModelPropertyOptional()
  policy?: string;

  @IsString()
  @ApiModelPropertyOptional({ example: 'Allianz' })
  insurance?: string;

  @IsDate()
  @ApiModelPropertyOptional({ format: 'date', type: 'string' })
  expiresIn?: Date;

  // Accident related info
  @IsArray()
  @IsOptional()
  @ApiModelPropertyOptional()
  damages?: number[];

  @IsNumber()
  @ApiModelProperty()
  accident: number;

  constructor(vehicle: Vehicle) {
    this.id = vehicle.id;
    this.register = vehicle.register;
    this.type = vehicle.type;
    this.make = vehicle.make;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.policy = vehicle.policy;
    this.insurance = vehicle.insurance;
    this.expiresIn = vehicle.expiresIn;
    this.damages = vehicle.damages;
    this.accident = vehicle.accident.id;
  }
}
