import { ApiModelProperty } from '@nestjs/swagger';
import { VehicleCreateDto } from './vehicle-create.dto';

export class VehicleDetailDto extends VehicleCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;
}
