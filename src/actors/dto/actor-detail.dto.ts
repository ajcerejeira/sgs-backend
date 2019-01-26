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

export class ActorDetailDto {
  // Identification
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

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
    this.nacionality = actor.nacionality;
    this.naturality = actor.naturality;
    this.parentage = actor.parentage;
    this.locality = actor.locality;
    this.address = actor.address;
    this.zipcode = actor.zipcode;
    this.doorNumber = actor.doorNumber;
    this.role = actor.role;
    this.injury = actor.injury;
    this.alcoholTest = actor.alcoholTest;
  }
}
