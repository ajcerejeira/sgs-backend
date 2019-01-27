import { Module } from '@nestjs/common';
import { AccidentsController } from './accidents.controller';
import { VehiclesController } from './vehicles.controller';

@Module({
  controllers: [AccidentsController, VehiclesController],
})
export class AccidentsModule {}
