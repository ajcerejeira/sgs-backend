import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsNumber, IsDate, IsJSON, IsOptional } from 'class-validator';
import { GeoJSON, Position } from 'geojson';
import { User } from 'src/users/user.entity';

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
}
