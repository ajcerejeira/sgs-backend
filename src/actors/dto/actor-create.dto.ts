import { Actor } from '../actor.entity';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';

export class ActorCreateDto {
  @IsString()
  @IsOptional()
  idType?: string;

  @IsString()
  @IsOptional()
  idNumber?: string;

  @IsDateString()
  @IsOptional()
  expires?: string;

  @IsDateString()
  @IsOptional()
  emitedBy?: string;

  // Personal data
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  birth?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  nacionality?: string;

  @IsString()
  @IsOptional()
  naturality?: string;

  @IsArray()
  @IsOptional()
  parentage?: string[];

  // Actor location
  @IsString()
  @IsOptional()
  locality?: string;

  @IsString()
  @IsOptional()
  zipcode?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  doorNumber?: string;

  // Accident related
  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  injury?: string;

  @IsNumber()
  @IsOptional()
  alcoholTest?: number;
}
