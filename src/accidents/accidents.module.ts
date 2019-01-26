import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentsController } from './accidents.controller';
import { AccidentsService } from './accidents.service';
import { Accident, AccidentVehicle } from './accident.entity';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accident, AccidentVehicle]),
    VehiclesModule,
  ],
  controllers: [AccidentsController],
  providers: [AccidentsService],
})
export class AccidentsModule {}
