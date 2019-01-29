import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { VehicleMeta } from '../entities/vehicle-meta.entity';
import { VehicleDetailDto } from '../dto/vehicle-detail.dto';
import { Accident } from '../entities/accident.entity';
import { VehicleCreateDto } from '../dto/vehicle-create.dto';
import { AccidentDetailDto } from '../dto/accident-detail.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleMeta)
    private readonly vehicleMetaRepository: Repository<VehicleMeta>,
  ) {}

  async list(accidentId: number): Promise<VehicleDetailDto[]> {
    return (await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .innerJoinAndSelect('vehicle.meta', 'meta')
      .where('vehicle.accident.id = :accidentId', { accidentId })
      .getMany()).map(({ meta, ...vehicle }) => ({ ...meta, ...vehicle }));
  }

  async create(
    accidentId: number,
    vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    const vehicleMeta = await this.vehicleMetaRepository.save({ ...vehicle });
    const { meta, ...createdVehicle } = await this.vehicleRepository.save({
      ...vehicle,
      meta: vehicleMeta,
      accident: accidentId,
    });
    return { ...meta, ...createdVehicle } as VehicleDetailDto;
  }

  async detail(
    accidentId: number,
    vehicleId: number,
  ): Promise<VehicleDetailDto> {
    const { meta, ...vehicle } = (await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .innerJoinAndSelect('vehicle.meta', 'meta')
      .where('vehicle.accident.id = :accidentId', { accidentId })
      .andWhere('vehicle.id = :vehicleId', { vehicleId })
      .getOne()) || { meta: null };
    if (!vehicle) {
      throw new NotFoundException();
    }
    return { ...meta, ...vehicle } as VehicleDetailDto;
  }

  async update(
    accidentId: number,
    vehicleId: number,
    newVehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    const { meta, ...vehicle } = await this.vehicleRepository.findOne(
      vehicleId,
      { relations: ['meta'] },
    );
    if (!vehicle || !meta) {
      throw new NotFoundException();
    }
    const updatedMeta = await this.vehicleMetaRepository.save({
      id: meta.id,
      ...meta,
      ...newVehicle,
    });
    const updatedVehicle = await this.vehicleRepository.save({
      id: vehicleId,
      accident: accidentId,
      ...vehicle,
      ...newVehicle,
    });
    return {
      ...updatedMeta,
      ...updatedVehicle,
      vehicles: [],
      actors: [],
    } as AccidentDetailDto;
  }

  async delete(
    accidentId: number,
    vehicleId: number,
  ): Promise<VehicleDetailDto> {
    const vehicle = await this.detail(accidentId, vehicleId);
    await this.vehicleRepository.delete(vehicleId);
    return vehicle;
  }
}
