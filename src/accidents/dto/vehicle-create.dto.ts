import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { ActorDetailDto } from './actor-detail.dto';
import { VehicleMetaCreateDto } from './vehicle-meta-create.dto';

export class VehicleCreateDto extends VehicleMetaCreateDto {
  @ApiModelPropertyOptional({ type: 'number', isArray: true, example: [1, 3, 5] })
  damages?: number[];

  @ApiModelPropertyOptional()
  driver?: ActorDetailDto;

  @ApiModelPropertyOptional({ type: ActorDetailDto, isArray: true })
  passengers?: ActorDetailDto[];
}
