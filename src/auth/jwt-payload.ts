import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class JwtPayload {
  @IsEmail()
  @ApiModelProperty({ description: 'Institutional email', format: 'email' })
  readonly email: string;

  @IsString()
  @ApiModelProperty({ example: 'ilovekittens' })
  readonly password: string;
}
