import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsNumber,
  IsString,
  IsEmail,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';

@Entity()
export class Actor {
  // Identification
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @IsString()
  idType?: string;

  @Column({ nullable: true })
  @IsString()
  idNumber?: string;

  @Column({ nullable: true })
  @IsDateString()
  expires?: string;

  @Column({ nullable: true })
  @IsDateString()
  emitedBy?: string;

  // Personal data
  @Column({ nullable: true })
  @IsString()
  name?: string;

  @Column({ nullable: true })
  @IsDateString()
  birth?: string;

  @Column({ nullable: true })
  @IsEmail()
  email?: string;

  @Column({ nullable: true })
  @IsString()
  phone?: string;

  @Column({ nullable: true })
  @IsString()
  nacionality?: string;

  @Column({ nullable: true })
  @IsString()
  naturality?: string;

  @Column('char', { array: true, nullable: true })
  parentage?: string[];

  // Actor location
  @Column({ nullable: true })
  @IsString()
  locality?: string;

  @Column({ nullable: true })
  @IsString()
  zipcode?: string;

  @Column({ nullable: true })
  @IsString()
  address?: string;

  @Column({ nullable: true })
  @IsString()
  doorNumber?: string;

  // Accident related
  @Column({ nullable: true })
  @IsString()
  role?: string;

  @Column({ nullable: true })
  @IsString()
  injury?: string;

  @Column({ nullable: true })
  @IsNumber()
  alcoholTest?: number;
}
