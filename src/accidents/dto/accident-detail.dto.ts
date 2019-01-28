import { ApiModelProperty } from '@nestjs/swagger';
import { AccidentCreateDto } from './accident-create.dto';
import { VehicleDetailDto } from './vehicle-detail.dto';
import { ActorDetailDto } from './actor-detail.dto';

export class AccidentDetailDto extends AccidentCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;

  @ApiModelProperty({ type: ActorDetailDto, isArray: true })
  actors: ActorDetailDto[];

  @ApiModelProperty({ type: VehicleDetailDto, isArray: true })
  vehicles: VehicleDetailDto[];
}
