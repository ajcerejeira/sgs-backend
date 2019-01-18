import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'John Doe' })
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'email' })
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'ilovekittens' })
  readonly password?: string;
}
