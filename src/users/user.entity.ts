import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsEmail, IsString, IsNumber } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ length: 200 })
  @IsString()
  name: string;

  @Column({ length: 200 })
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 200 })
  @IsString()
  password: string;
}
