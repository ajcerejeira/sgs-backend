import { ApiModelProperty } from '@nestjs/swagger';
import { AccidentCreateDto } from './accident-create.dto';
import { VehicleDetailDto } from './vehicle-detail.dto';

export class AccidentDetailDto extends AccidentCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;

  @ApiModelProperty({
    default: [],
    type: VehicleDetailDto,
    isArray: true,
  })
  vehicles: VehicleDetailDto[];
}
