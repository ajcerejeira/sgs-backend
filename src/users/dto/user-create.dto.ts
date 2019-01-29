import { ApiModelProperty, ApiUseTags } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @ApiModelProperty({ description: 'Full name', example: 'John Doe' })
  readonly name: string;

  @IsEmail()
  @ApiModelProperty({ description: 'Institutional email', format: 'email' })
  readonly email: string;

  @IsString()
  @ApiModelProperty({ example: 'ilovekittens' })
  readonly password: string;
}
