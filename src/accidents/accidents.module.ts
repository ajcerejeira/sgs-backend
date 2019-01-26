import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentsController } from './accidents.controller';
import { AccidentsService } from './accidents.service';
import { Accident } from './accident.entity';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accident]),
    VehiclesModule,
  ],
  controllers: [AccidentsController],
  providers: [AccidentsService],
})
export class AccidentsModule {}
