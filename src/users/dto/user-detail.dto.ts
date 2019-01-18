import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserDetailDto {
  @ApiModelProperty()
  readonly id: number;

  @ApiModelProperty({ example: 'John Doe' })
  readonly name: string;

  @ApiModelProperty({ format: 'email' })
  readonly email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
