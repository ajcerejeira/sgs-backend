import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsEmail, IsString, IsNumber, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiModelProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({ example: 'John Doe' })
  @Column({ length: 200 })
  name: string;

  @ApiModelProperty({ example: 'john@doe.com' })
  @Column({ length: 200 })
  @Index({ unique: true })
  email: string;

  @ApiModelProperty({ example: 'ilovekittens' })
  @Exclude({ toPlainOnly: true })
  @Column({ length: 200 })
  password: string;
}
