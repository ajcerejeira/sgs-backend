import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class VehicleMeta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  register?: string;

  @Column({ nullable: true })
  type?: string;

  // Brand
  @Column({ nullable: true })
  make?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ type: 'int', nullable: true })
  year?: number;

  @Column({ nullable: true })
  color?: string;

  // Insurance
  @Column({ nullable: true })
  policy?: string;

  @Column({ nullable: true })
  insurance?: string;

  @Column({ nullable: true })
  expirationDate?: Date;

  // Vehicles in accidents that have this meta information
  @OneToMany(type => Vehicle, vehicle => vehicle.meta)
  vehicles: Vehicle[];
}
