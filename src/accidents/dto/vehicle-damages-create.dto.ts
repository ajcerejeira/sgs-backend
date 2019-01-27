import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { VehicleCreateDto } from './vehicle-create.dto';

export class VehicleCreateDamageDto extends VehicleCreateDto {
  @ApiModelProperty({ format: 'int', type: 'number', isArray: true })
  @IsArray()
  damages: number[];
}
