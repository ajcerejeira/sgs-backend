import { ApiModelProperty } from '@nestjs/swagger';
import { AccidentCreateDto } from './accident-create.dto';
import { VehicleDetailDamageDto } from './vehicle-damages-detail.dto';

export class AccidentDetailDto extends AccidentCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;

  @ApiModelProperty({
    default: [],
    type: VehicleDetailDamageDto,
    isArray: true,
  })
  vehicles: VehicleDetailDamageDto[];
}
