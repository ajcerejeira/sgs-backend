import { Actor } from '../actor.entity';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsEmail,
  IsOptional,
  IsArray,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ActorDetailDto {
  // Identification
  @IsNumber()
  @ApiModelProperty()
  id: number;

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

  @IsString()
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
  @ApiModelPropertyOptional({
    example: ['John Father Doe', 'Johanna Mother Doe'],
  })
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
  @IsNumber()
  @ApiModelProperty()
  accident: number;

  @IsNumber()
  @IsOptional()
  @ApiModelPropertyOptional()
  vehicle?: number;

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

  constructor(actor: Actor) {
    this.id = actor.id;
    this.idType = actor.idType;
    this.idNumber = actor.idNumber;
    this.expires = actor.expires;
    this.emitedBy = actor.emitedBy;
    this.name = actor.name;
    this.birth = actor.birth;
    this.email = actor.email;
    this.phone = actor.phone;
    this.nationality = actor.nationality;
    this.naturality = actor.naturality;
    this.parentage = actor.parentage;
    this.locality = actor.locality;
    this.address = actor.address;
    this.zipcode = actor.zipcode;
    this.doorNumber = actor.doorNumber;
    this.accident = actor.accident.id;
    this.vehicle = actor.vehicle.id;
    this.role = actor.role;
    this.injury = actor.injury;
    this.alcoholTest = actor.alcoholTest;
  }
}
