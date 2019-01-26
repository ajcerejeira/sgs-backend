import {
  IsString,
  IsNumber,
  IsDateString,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class ActorCreateDto {
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Driver license' })
  idType?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  idNumber?: string;

  @IsDateString()
  @IsOptional()
  @ApiModelPropertyOptional({ type: 'string', format: 'date' })
  expires?: string;

  @IsDateString()
  @IsOptional()
  @ApiModelPropertyOptional()
  emitedBy?: string;

  // Personal data
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'John Doe' })
  name?: string;

  @IsDateString()
  @IsOptional()
  @ApiModelPropertyOptional({ type: 'string', format: 'date' })
  birth?: string;

  @IsEmail()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'email' })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: '912 345 678' })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Portugues' })
  nationality?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional()
  naturality?: string;

  @IsArray()
  @IsOptional()
  @ApiModelPropertyOptional({ example: ['John Father Doe', 'Johanna Mother Doe'] })
  parentage?: string[];

  // Actor location
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Mordor' })
  locality?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: '1123-581' })
  zipcode?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'St. 45, Hobbitton' })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: '43A' })
  doorNumber?: string;

  // Accident related
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Driver' })
  role?: string;

  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Severe' })
  injury?: string;

  @IsNumber()
  @IsOptional()
  alcoholTest?: number;
}
