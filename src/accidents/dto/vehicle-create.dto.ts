import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { VehicleMetaDto } from './vehicle-meta.dto';
import { ActorDetailDto } from './actor-detail.dto';

export class VehicleCreateDto {
  @ApiModelPropertyOptional({
    type: 'number',
    isArray: true,
    example: [1, 3, 5],
  })
  damages?: number[];

  @ApiModelPropertyOptional()
  driver?: ActorDetailDto;

  @ApiModelPropertyOptional({ type: ActorDetailDto, isArray: true })
  passengers?: ActorDetailDto[];

  @ApiModelPropertyOptional()
  meta: VehicleMetaDto;
}
