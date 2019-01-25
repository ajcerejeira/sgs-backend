import { IsString, IsPositive, IsHexColor } from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class VehicleCreateDto {
  @IsString()
  @ApiModelPropertyOptional()
  register?: string;

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
  policy?: string;

  @IsString()
  @ApiModelPropertyOptional({ example: 'Allianz' })
  insurance?: string;
}
