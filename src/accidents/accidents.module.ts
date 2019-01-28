import { Module } from '@nestjs/common';
import { AccidentsController } from './controllers/accidents.controller';
import { ActorsController } from './controllers/actors.controller';
import { VehiclesController } from './controllers/vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accident } from './entities/accident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accident])],
  controllers: [AccidentsController, ActorsController, VehiclesController],
})
export class AccidentsModule {}
