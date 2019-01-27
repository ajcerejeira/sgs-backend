import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNumber, IsJSON, IsDateString } from 'class-validator';
import { GeoJSON, Position } from 'geojson';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Actor } from '../actors/actor.entity';

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @IsDateString()
  date?: string;

  @Column('float', { array: true, nullable: true })
  location?: Position;

  @Column('json', { nullable: true })
  @IsJSON()
  sketch?: GeoJSON;

  @OneToMany(type => Vehicle, vehicle => vehicle.accident, {
    onDelete: 'CASCADE',
  })
  vehicles: Vehicle[];

  @OneToMany(type => Actor, actor => actor.accident, {
    onDelete: 'CASCADE',
  })
  actors: Actor[];
}

