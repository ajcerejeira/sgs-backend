import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsPositive,
  IsHexColor,
  IsDateString,
} from 'class-validator';

export class VehicleCreateDto {
  @ApiModelPropertyOptional({ example: '25-33-XQ' })
  @IsString()
  @IsOptional()
  register?: string;

  // Brand
  @ApiModelPropertyOptional({ example: 'Ford' })
  @IsString()
  @IsOptional()
  make?: string;

  @ApiModelPropertyOptional({ example: 'Focus' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiModelPropertyOptional({
    format: 'int',
    example: 2004,
    maximum: new Date().getFullYear(),
  })
  @IsPositive()
  @IsOptional()
  year?: number;

  @ApiModelPropertyOptional({ example: '#ffffff' })
  @IsHexColor()
  @IsOptional()
  color?: string;

  // Insurance
  @ApiModelPropertyOptional({ example: '10894911' })
  @IsString()
  @IsOptional()
  policy?: string;

  @ApiModelPropertyOptional({ example: 'Allianz' })
  @IsString()
  @IsOptional()
  insurance?: string;

  @ApiModelPropertyOptional({
    format: 'date',
    type: 'string',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  expiresIn?: Date;
}
