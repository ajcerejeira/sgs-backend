import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200 })
  @Index({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 200 })
  @Exclude()
  password: string;
}
