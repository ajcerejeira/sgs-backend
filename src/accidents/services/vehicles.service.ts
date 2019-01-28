import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleMeta } from '../entities/vehicle-meta.entity';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleMeta)
    private readonly vehicleMetaRepository: Repository<VehicleMeta>,
  ) {}
}
