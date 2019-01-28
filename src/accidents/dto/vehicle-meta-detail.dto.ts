import { ApiModelProperty } from '@nestjs/swagger';
import { VehicleMetaCreateDto } from './vehicle-meta-create.dto';

export class VehicleMetaDetailDto extends VehicleMetaCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;
}
