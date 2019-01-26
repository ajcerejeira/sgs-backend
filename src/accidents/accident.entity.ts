import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsNumber, IsDate, IsJSON, IsOptional } from 'class-validator';
import { GeoJSON, Position } from 'geojson';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @IsDate()
  date?: Date;

  @Column('float', { array: true, nullable: true })
  location?: Position;

  @Column('json', { nullable: true })
  @IsJSON()
  sketch?: GeoJSON;

  @ManyToMany(type => Vehicle)
  @JoinTable()
  vehicles: Vehicle[];
}
