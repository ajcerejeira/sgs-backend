import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleMeta } from '../entities/vehicle-meta.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { ActorsService } from './actors.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleMeta)
    private readonly vehicleMetaRepository: Repository<VehicleMeta>,
    @Inject(forwardRef(() => ActorsService))
    private readonly actorsService: ActorsService,
  ) {}

  async list(accidentId: number): Promise<any[]> {
    const vehicles = await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.meta', 'meta')
      .leftJoinAndSelect('vehicle.driver', 'driver')
      .leftJoinAndSelect('driver.person', 'person')
      .where('vehicle.accident.id = :accidentId', { accidentId })
      .getMany();
    return vehicles.map(vehicle => {
      const pictures = vehicle.pictures.map((picture, i) => `https://sgs-backend.herokuapp.com/api/accidents/${accidentId}/vehicles/${vehicle.id}/pictures/${i}`);
      console.log(pictures);
      return { ...vehicle, pictures };
    });
  }

  async create(accidentId: number, vehicle: Vehicle): Promise<Vehicle> {
    const meta =
      (await this.vehicleMetaRepository.findOne({
        register: vehicle.meta.register,
      })) || (await this.vehicleMetaRepository.save(vehicle.meta));
    const createdVehicle = await this.vehicleRepository.save({
      accident: accidentId,
      ...vehicle,
      driver:
        vehicle.driver && vehicle.driver.id
          ? await this.actorsService.detail(accidentId, vehicle.driver.id)
          : null,
      passengers: vehicle.passengers
        ? await Promise.all(
            vehicle.passengers.map(async passenger =>
              passenger.id
                ? await this.actorsService.detail(accidentId, passenger.id)
                : null,
            ),
          )
        : null,
      meta,
    });
    return createdVehicle;
  }

  async detail(accidentId: number, vehicleId: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.meta', 'meta')
      .leftJoinAndSelect('vehicle.driver', 'driver')
      .leftJoinAndSelect('driver.person', 'person')
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
    newVehicle: Vehicle,
  ): Promise<Vehicle> {
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
      driver:
        newVehicle.driver && newVehicle.driver.id
          ? await this.actorsService.detail(accidentId, newVehicle.driver.id)
          : null,
      passengers: newVehicle.passengers
        ? await Promise.all(
            newVehicle.passengers.map(async passenger =>
              passenger.id
                ? await this.actorsService.detail(accidentId, passenger.id)
                : null,
            ),
          )
        : null,
      meta: newMeta,
    });
  }

  async delete(accidentId: number, vehicleId: number): Promise<Vehicle> {
    const vehicle = this.detail(accidentId, vehicleId);
    await this.vehicleRepository.delete(vehicleId);
    return vehicle;
  }
}
