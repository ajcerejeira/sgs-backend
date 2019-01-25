import { IsString, IsPositive, IsHexColor, IsEnum, IsDate } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { VehicleType } from '../vehicle.entity';

export class VehicleCreateDto {
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
}
