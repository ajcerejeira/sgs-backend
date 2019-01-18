import { ApiModelProperty, ApiUseTags } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @ApiModelProperty({ example: 'John Doe' })
  readonly name: string;

  @IsEmail()
  @ApiModelProperty({ format: 'email' })
  readonly email: string;

  @IsString()
  @ApiModelProperty({ example: 'ilovekittens' })
  readonly password: string;
}
