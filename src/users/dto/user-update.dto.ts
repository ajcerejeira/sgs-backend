import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ description: 'Full name', example: 'John Doe' })
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  @ApiModelPropertyOptional({
    description: 'Institutional email',
    format: 'email',
  })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'ilovekittens' })
  readonly password?: string;
}
