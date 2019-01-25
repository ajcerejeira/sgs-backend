import { IsDate, IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Accident } from '../accident.entity';

export class AccidentDetailDto {
  @IsNumber()
  @ApiModelPropertyOptional()
  id: number;

  @IsDate()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'date', type: 'string' })
  date?: Date;

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
