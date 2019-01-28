import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsEmail,
  IsArray,
  IsEnum,
} from 'class-validator';

export enum IdentityDocumentType {
  IdentityDocument = 'IdentityDocument',
  DriverLicense = 'DriverLicense',
  Passport = 'Passport',
}

export class PersonCreateDto {
  // Identification
  @ApiModelPropertyOptional({
    enum: Object.keys(IdentityDocumentType),
    example: IdentityDocumentType.DriverLicense,
  })
  @IsEnum(IdentityDocumentType)
  @IsOptional()
  identityDocumentType?: IdentityDocumentType;

  @ApiModelPropertyOptional({ example: '474293087' })
  @IsString()
  @IsOptional()
  identityDocumentNumber?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  identityDocumentExpirationDate?: Date;

  @ApiModelPropertyOptional({ example: 'Hogwarts Driver School' })
  @IsString()
  @IsOptional()
  identityDocumentEmitedBy?: string;

  // Personal data
  @ApiModelPropertyOptional({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  birth?: Date;

  @ApiModelPropertyOptional({ format: 'email', example: 'john@doe.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiModelPropertyOptional({ example: '912 345 678' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiModelPropertyOptional({ example: 'Portuguese' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiModelPropertyOptional()
  @IsString()
  @IsOptional()
  naturality?: string;

  @ApiModelPropertyOptional({
    example: ['Paul Doe', 'Monica Sugar'],
  })
  @IsArray()
  @IsOptional()
  parentage?: string[];

  // Actor location
  @IsString()
  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Mordor' })
  locality?: string;

  @ApiModelPropertyOptional({ example: 'Street 45' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiModelPropertyOptional({ example: '1123-581' })
  @IsString()
  @IsOptional()
  zipcode?: string;

  @ApiModelPropertyOptional({ example: '43A' })
  @IsString()
  @IsOptional()
  doorNumber?: string;
}
