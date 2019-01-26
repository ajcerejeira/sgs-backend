import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { IsNumber, IsDate, IsJSON, IsOptional } from 'class-validator';
import { GeoJSON, Position } from 'geojson';
import { Vehicle } from 'src/vehicles/vehicle.entity';

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column({ nullable: true })
  @IsDate()
  date?: Date;

  @Column('int', { array: true, nullable: true })
  location?: Position;

  @Column('json', { nullable: true })
  @IsJSON()
  sketch?: GeoJSON;

  @OneToMany(
    type => AccidentVehicle,
    accidentVehicle => accidentVehicle.accident,
  )
  vehicles: AccidentVehicle[];
}

@Entity()
export class AccidentVehicle {
  @ManyToOne(type => Accident, accident => accident.vehicles, { primary: true })
  accident: Accident;

  @ManyToOne(type => Vehicle, { primary: true })
  vehicle: Vehicle;

  @Column('int', { array: true })
  damages: number[];
}
