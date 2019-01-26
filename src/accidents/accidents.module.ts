import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentsController } from './accidents.controller';
import { AccidentsService } from './accidents.service';
import { Accident } from './accident.entity';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accident]),
    VehiclesModule,
    forwardRef(() => VehiclesModule)
  ],
  controllers: [AccidentsController],
  providers: [AccidentsService],
})
export class AccidentsModule {}
