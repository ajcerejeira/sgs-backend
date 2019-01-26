import { IsDate, IsArray, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Accident } from '../accident.entity';

export class AccidentDetailDto {
  @IsNumber()
  @ApiModelPropertyOptional()
  id: number;

  @IsDateString()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'date', type: 'string' })
  date?: string;

  @IsArray()
  @IsOptional()
  @ApiModelProperty({ type: [Number] })
  location?: number[];

  constructor(accident: Accident) {
    this.id = accident.id;
    this.date = accident.date;
    this.location = accident.location;
  }
}
