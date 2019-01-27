import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUrl, IsNumber, IsString, ValidateNested, IsArray } from 'class-validator';

export class LocationDto {
  @ApiModelPropertyOptional({
    type: 'number',
    isArray: true,
    example: [51.531611, -0.124586],
  })
  @IsOptional()
  position?: number[];

  @ApiModelPropertyOptional({ example: 'Kings Cross, Londo, United Kingdom' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiModelPropertyOptional({ type: 'string', format: 'uri' })
  @IsOptional()
  @IsUrl()
  map?: string;
}
