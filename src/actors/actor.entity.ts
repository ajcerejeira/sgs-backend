import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNumber, IsString, IsEmail, IsDateString } from 'class-validator';
import { Accident } from '../accidents/accident.entity';
import { Vehicle } from '../vehicles/vehicle.entity';

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
  @IsString()
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
  nationality?: string;

  @Column({ nullable: true })
  @IsString()
  naturality?: string;

  @Column('text', { array: true, nullable: true })
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
  @ManyToOne(type => Accident, accident => accident.actors, {
    onDelete: 'CASCADE',
  })
  accident: Accident;

  @ManyToOne(type => Vehicle, vehicle => vehicle.actors, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  vehicle?: Vehicle;

  @Column({ nullable: true })
  @IsString()
  role?: string;

  @Column({ nullable: true })
  @IsString()
  injury?: string;

  @Column('float', { nullable: true })
  @IsNumber()
  alcoholTest?: number;
}
