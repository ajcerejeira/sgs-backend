import { Module, forwardRef } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { Accident } from '../accidents/accident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Accident])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
