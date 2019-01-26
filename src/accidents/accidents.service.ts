import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { AccidentCreateDto } from './dto/accident-create.dto';
import { Accident, AccidentVehicle } from './accident.entity';
import { AccidentDetailDto } from './dto/accident-detail.dto';
import { VehicleDetailDto } from 'src/vehicles/dto/vehicle-detail.dto';
import { VehicleCreateDto } from 'src/vehicles/dto/vehicle-create.dto';
import { Vehicle } from 'src/vehicles/vehicle.entity';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
    @InjectRepository(AccidentVehicle)
    private readonly accidentVehicleRepository: Repository<AccidentVehicle>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async list(): Promise<AccidentDetailDto[]> {
    const accidents = await this.accidentRepository.find();
    return accidents.map(vehicle => new AccidentDetailDto(vehicle));
  }

  async create(accident: AccidentCreateDto): Promise<AccidentDetailDto> {
    const newAccident = new Accident();
    newAccident.date = accident.date;
    newAccident.location = accident.location;
    return new AccidentDetailDto(
      await this.accidentRepository.save(newAccident),
    );
  }

  async detail(id: number): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id);
    if (!accident) {
      throw new NotFoundException('The requested accident could not be found');
    }
    return new AccidentDetailDto(accident);
  }

  async update(
    id: number,
    newAccident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id);
    if (!accident) {
      throw new NotFoundException('The requested vehicle could not be found');
    }
    const updatedVehicle = await this.accidentRepository.save({
      id,
      ...accident,
      ...newAccident,
    });
    return new AccidentDetailDto(updatedVehicle);
  }

  async delete(id: number): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id);
    if (!accident) {
      throw new NotFoundException('The requested accident could not be found');
    }
    await this.accidentRepository.delete(accident);
    return new AccidentDetailDto(accident);
  }

  //
  // Vehicles
  //
  async vehicleList(accidentId: number): Promise<VehicleDetailDto[]> {
    const accident = await this.accidentRepository.findOne(accidentId);
    if (!accident) {
      throw new NotFoundException('The requested accident could not be found');
    }
    const vehicles = await this.accidentRepository
      .createQueryBuilder('accident')
      .innerJoin('accident.vehicles', 'accidentVehicle')
      .innerJoin('accidentVehicle.vehicle', 'vehicle')
      .where('accident.id = :accidentId', { accidentId })
      .getMany();

    console.log(vehicles);
    return [];
  }

  async vehicleCreate(
    accidentId: number,
    vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    const accident = await this.accidentRepository.findOne(accidentId);
    if (!accident) {
      throw new NotFoundException('The requested accident could not be found');
    }
    const newVehicle = await this.vehicleRepository.save(vehicle);
    const accidentVehicle = await this.accidentVehicleRepository.save({
      accident: accident.id,
      vehicle: newVehicle.id,
      damages: [1, 2, 3],
    });
    return newVehicle;
  }
}
