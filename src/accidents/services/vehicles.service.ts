import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleMeta } from '../entities/vehicle-meta.entity';
import { VehicleDetailDto } from '../dto/vehicle-detail.dto';
import { VehicleCreateDto } from '../dto/vehicle-create.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleMeta)
    private readonly vehicleMetaRepository: Repository<VehicleMeta>,
  ) {}

  async list(accidentId: number): Promise<VehicleDetailDto[]> {
    return await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.meta', 'meta')
      .where('vehicle.accident.id = :accidentId', { accidentId })
      .getMany();
  }

  async create(
    accidentId: number,
    vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    const meta =
      (await this.vehicleMetaRepository.findOne({
        register: vehicle.meta.register,
      })) || (await this.vehicleMetaRepository.save(vehicle.meta));
    const createdVehicle = await this.vehicleRepository.save({
      accident: accidentId,
      ...vehicle,
      meta,
    });
    return createdVehicle;
  }

  async detail(
    accidentId: number,
    vehicleId: number,
  ): Promise<VehicleDetailDto> {
    const vehicle = await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.meta', 'meta')
      .where('vehicle.accident.id = :accidentId', { accidentId })
      .andWhere('vehicle.id = :vehicleId', { vehicleId })
      .getOne();
    if (!vehicle) {
      throw new NotFoundException();
    }
    return vehicle;
  }

  async update(
    accidentId: number,
    vehicleId: number,
    newVehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    const oldVehicle = await this.detail(accidentId, vehicleId);
    const oldMeta = await this.vehicleMetaRepository.findOne({
      register: oldVehicle.meta.register,
    });
    const newMeta = await this.vehicleMetaRepository.save({
      ...oldMeta,
      ...newVehicle.meta,
    });
    return await this.vehicleRepository.save({
      ...oldVehicle,
      ...newVehicle,
      meta: newMeta,
    });
  }

  async delete(
    accidentId: number,
    vehicleId: number,
  ): Promise<VehicleDetailDto> {
    const vehicle = this.detail(accidentId, vehicleId);
    await this.vehicleRepository.delete(vehicleId);
    return vehicle;
  }
}
