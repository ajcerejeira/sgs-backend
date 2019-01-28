import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ActorCreateDto } from './actor-create.dto';

export class ActorDetailDto extends ActorCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;
}
