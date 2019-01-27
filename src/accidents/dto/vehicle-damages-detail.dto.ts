import { VehicleDetailDto } from './vehicle-detail.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class VehicleDetailDamageDto extends VehicleDetailDto {
  @ApiModelProperty({ format: 'int', type: 'number', isArray: true })
  @IsArray()
  damages: number[];
}
