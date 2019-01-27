import { ApiModelProperty } from '@nestjs/swagger';
import { AccidentCreateDto } from './accident-create.dto';

export class AccidentDetailDto extends AccidentCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;
}
