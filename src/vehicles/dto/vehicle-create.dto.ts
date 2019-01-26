import {
  IsString,
  IsPositive,
  IsHexColor,
  IsEnum,
  IsDate,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { VehicleType } from '../vehicle.entity';

export class VehicleCreateDto {
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
  @IsOptional()
  @ApiModelPropertyOptional()
  policy?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Allianz' })
  insurance?: string;

  @IsDate()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'date', type: 'string' })
  expiresIn?: Date;

  // Accident related info
  @IsArray()
  @ApiModelPropertyOptional()
  damages?: number[];
}
