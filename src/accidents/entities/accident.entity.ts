import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  AfterInsert,
} from 'typeorm';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';
import { Vehicle } from './vehicle.entity';
import { Actor } from './actor.entity';

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  @Column({ nullable: true })
  date?: Date;

  @ApiModelPropertyOptional({
    type: 'number',
    isArray: true,
    example: [51.532041, -0.124228],
  })
  @IsOptional()
  @Column('float', { array: true, nullable: true })
  position?: number[];

  @ApiModelPropertyOptional({
    type: 'string',
    example: 'Kings Cross, Londres, United Kingdom',
  })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  address?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'url',
    example:
      'https://maps.googleapis.com/maps/api/staticmap?center=51.532041,-0.1242288&zoom=19&size=400x200',
  })
  @IsUrl()
  @IsOptional()
  @Column({ nullable: true })
  mapUrl?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Column('json', { nullable: true })
  sketch?: object;

  @ApiModelProperty({ example: [] })
  @OneToMany(type => Vehicle, vehicle => vehicle.accident, {
    onDelete: 'CASCADE',
  })
  vehicles: Vehicle[];

  @ApiModelProperty({ example: [] })
  @OneToMany(type => Actor, actor => actor.accident, { onDelete: 'CASCADE' })
  actors: Actor[];
}
