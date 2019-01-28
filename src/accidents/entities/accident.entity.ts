import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
