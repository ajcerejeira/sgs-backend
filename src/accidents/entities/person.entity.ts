import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum IdentityDocumentType {
  IdentityDocument = 'IdentityDocument',
  DriverLicense = 'DriverLicense',
  Passport = 'Passport',
}

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  // Identification
  @ApiModelPropertyOptional({
    enum: Object.keys(IdentityDocumentType),
    example: IdentityDocumentType.DriverLicense,
  })
  @IsEnum(IdentityDocumentType)
  @IsOptional()
  @Column({ enum: IdentityDocumentType, nullable: true })
  identityDocumentType?: IdentityDocumentType;

  @ApiModelPropertyOptional({ example: '474293087' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  identityDocumentNumber?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  @Column({ nullable: true })
  identityDocumentExpirationDate?: Date;

  @ApiModelPropertyOptional({ example: 'Hogwarts Driver School' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  identityDocumentEmitedBy?: string;

  // Personal data
  @ApiModelPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  name?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  @Column({ nullable: true })
  birth?: Date;

  @ApiModelPropertyOptional({ format: 'email', example: 'john@doe.com' })
  @IsEmail()
  @IsOptional()
  @Column({ nullable: true })
  email?: string;

  @ApiModelPropertyOptional({ example: '912 345 678' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  phone?: string;

  @ApiModelPropertyOptional({ example: 'Portuguese' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  nationality?: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  naturality?: string;

  @ApiModelPropertyOptional({
    example: ['Paul Doe', 'Monica Sugar'],
  })
  @IsArray()
  @IsOptional()
  @Column('varchar', { array: true, nullable: true })
  parentage?: string[];

  // Location
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Mordor' })
  @Column({ nullable: true })
  locality?: string;

  @ApiModelPropertyOptional({ example: 'Street 45' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  address?: string;

  @ApiModelPropertyOptional({ example: '1123-581' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  zipcode?: string;

  @ApiModelPropertyOptional({ example: '43A' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  doorNumber?: string;
}
