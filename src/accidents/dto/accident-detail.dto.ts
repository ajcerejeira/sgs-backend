import {
  IsDate,
  IsArray,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Accident } from '../accident.entity';
import { VehicleDetailDto } from '../../vehicles/dto/vehicle-detail.dto';

export class AccidentDetailDto {
  @IsNumber()
  @ApiModelProperty()
  id: number;

  @IsDateString()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'date', type: 'string' })
  date?: string;

  @IsArray()
  @IsOptional()
  @ApiModelProperty({ type: [Number] })
  location?: number[];

  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Rua da Ponte, 47 Lousado' })
  address?: string;

  @IsArray()
  @ApiModelProperty()
  vehicles: VehicleDetailDto[];

  constructor(accident: Accident) {
    this.id = accident.id;
    this.date = accident.date;
    this.location = accident.location;
    this.address = null;
    this.vehicles = accident.vehicles.map(
      vehicle => new VehicleDetailDto({ ...vehicle, accident: accident }),
    );
  }
}
