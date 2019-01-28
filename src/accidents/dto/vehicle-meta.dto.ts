import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsPositive,
  IsHexColor,
  IsDateString,
} from 'class-validator';

export class VehicleMetaDto {
  // Identification
  @ApiModelPropertyOptional({ example: '25-33-XQ' })
  @IsString()
  @IsOptional()
  register?: string;

  @ApiModelPropertyOptional({ type: 'string' })
  @IsString()
  @IsOptional()
  type?: string;

  // Brand
  @ApiModelPropertyOptional({ example: 'Ford' })
  @IsString()
  @IsOptional()
  make?: string;

  @ApiModelPropertyOptional({ example: 'Focus' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiModelPropertyOptional({ format: 'int', example: 2004 })
  @IsPositive()
  @IsOptional()
  year?: number;

  @ApiModelPropertyOptional({ example: '#ffffff' })
  @IsHexColor()
  @IsOptional()
  color?: string;

  // Insurance
  @ApiModelPropertyOptional({ example: '1092635146' })
  @IsString()
  @IsOptional()
  policy?: string;

  @ApiModelPropertyOptional({ example: 'Allianz' })
  @IsString()
  @IsOptional()
  insurance?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    default: new Date(),
  })
  @IsDateString()
  @IsOptional()
  expirationDate?: Date;
}
