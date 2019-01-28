import { ApiModelProperty } from '@nestjs/swagger';
import { PersonCreateDto } from './person-create.dto';

export class PersonDetailDto extends PersonCreateDto {
  @ApiModelProperty({ format: 'int' })
  id: number;
}
