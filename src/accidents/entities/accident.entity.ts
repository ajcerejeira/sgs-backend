import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accident {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  date?: Date;

  @Column('float', { array: true, nullable: true })
  location?: number[];

  @Column('json', { nullable: true })
  sketch?: object;
}
