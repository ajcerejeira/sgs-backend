import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentsController } from './accidents.controller';
import { AccidentsService } from './accidents.service';
import { Accident } from './accident.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';
import { GeocoderService } from './geocoder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accident]),
    forwardRef(() => VehiclesModule),
    HttpModule,
  ],
  controllers: [AccidentsController],
  providers: [AccidentsService, GeocoderService],
})
export class AccidentsModule {}
