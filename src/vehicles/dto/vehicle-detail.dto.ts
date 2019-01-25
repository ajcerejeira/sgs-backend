import { IsString, IsNumber, IsPositive, IsHexColor, IsEnum, IsDate } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Vehicle, VehicleType } from '../vehicle.entity';

export class VehicleDetailDto {
  // Identification
  @IsNumber()
  @ApiModelProperty()
  id: number;

  @IsString()
  @ApiModelPropertyOptional()
  register?: string;

  @IsEnum(VehicleType)
  @ApiModelPropertyOptional({ enum: VehicleType })
  type?: VehicleType;

  // Brand
  @IsString()
  @ApiModelPropertyOptional({ example: 'Ford' })
  make?: string;

  @IsString()
  @ApiModelPropertyOptional({ example: 'Focus' })
  model?: string;

  @IsPositive()
  @ApiModelPropertyOptional({ format: 'int32', example: 2004 })
  year?: number;

  @IsHexColor()
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
  }
}
