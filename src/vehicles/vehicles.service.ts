import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleDetailDto } from './dto/vehicle-detail.dto';
import { VehicleCreateDto } from './dto/vehicle-create.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async list(): Promise<VehicleDetailDto[]> {
    const vehicles = await this.vehicleRepository.find();
    return vehicles.map(vehicle => new VehicleDetailDto(vehicle));
  }

  async create(vehicle: VehicleCreateDto): Promise<VehicleDetailDto> {
    const newVehicle = await this.vehicleRepository.save(vehicle);
    return new VehicleDetailDto(newVehicle);
  }

  async detail(id: number): Promise<VehicleDetailDto> {
    const vehicle = await this.vehicleRepository.findOne(id);
    if (!vehicle) {
      throw new NotFoundException('The requested vehicle could not be found');
    }
    return new VehicleDetailDto(vehicle);
  }

  async update(
    id: number,
    newVehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    const vehicle = await this.vehicleRepository.findOne(id);
    if (!vehicle) {
      throw new NotFoundException('The requested vehicle could not be found');
    }
    const updatedVehicle = await this.vehicleRepository.save({
      id,
      ...vehicle,
      ...newVehicle,
    });
    return new VehicleDetailDto(updatedVehicle);
  }

  async delete(id: number): Promise<VehicleDetailDto> {
    const vehicle = await this.vehicleRepository.findOne(id);
    if (!vehicle) {
      throw new NotFoundException('The requested vehicle could not be found');
    }
    await this.vehicleRepository.delete(id);
    return new VehicleDetailDto(vehicle);
  }
}
