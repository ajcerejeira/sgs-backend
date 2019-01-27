import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { Actor } from './actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsService } from './actors.service';
import { Accident } from '../accidents/accident.entity';
import { Vehicle } from '../vehicles/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor, Accident, Vehicle])],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
