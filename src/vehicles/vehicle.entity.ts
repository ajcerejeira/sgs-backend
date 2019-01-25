import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNumber, IsPositive, IsHexColor } from 'class-validator';

@Entity()
export class Vehicle {
  // Identification
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @IsString()
  register?: string;

  // Brand
  @Column({ nullable: true })
  @IsString()
  make?: string;

  @Column({ nullable: true })
  @IsString()
  model?: string;

  @Column({ nullable: true, type: 'int' })
  @IsPositive()
  year?: number;

  @Column({ nullable: true })
  @IsHexColor()
  color?: string;

  // Insurance
  @Column({ nullable: true })
  @IsString()
  policy?: string;

  @Column({ nullable: true })
  @IsString()
  insurance?: string;
}
