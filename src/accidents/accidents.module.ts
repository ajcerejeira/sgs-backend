import { Module } from '@nestjs/common';
import { AccidentsController } from './accidents.controller';
import { ActorsController } from './actors.controller';
import { VehiclesController } from './vehicles.controller';

@Module({
  controllers: [AccidentsController, ActorsController, VehiclesController],
})
export class AccidentsModule {}
