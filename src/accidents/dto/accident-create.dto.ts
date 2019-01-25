import { IsDate, IsArray, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

export class AccidentCreateDto {
  @IsDate()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'date', type: 'string' })
  date?: Date;

  @IsArray()
  @IsOptional()
  @ApiModelProperty({ type: [Number] })
  location?: number[];
}
