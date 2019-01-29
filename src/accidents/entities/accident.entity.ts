import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  date?: Date;

  @Column('float', { array: true, nullable: true })
  position?: number[];

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  mapUrl?: string;

  @Column('json', { nullable: true })
  sketch?: object;

  @OneToMany(type => Vehicle, vehicle => vehicle.accident, {
    onDelete: 'CASCADE',
  })
  vehicles: Vehicle[];
}
