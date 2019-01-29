import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accident } from '../entities/accident.entity';
import { AccidentCreateDto } from '../dto/accident-create.dto';
import { AccidentDetailDto } from '../dto/accident-detail.dto';
import { VehiclesService } from './vehicles.service';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
    private readonly vehiclesService: VehiclesService,
  ) {}

  async list(): Promise<AccidentDetailDto[]> {
    const accidents = await this.accidentRepository.find({
      relations: ['vehicles'],
    });
    return Promise.all(
      accidents.map(
        async accident =>
          ({
            ...accident,
            vehicles: await Promise.all(
              accident.vehicles.map(
                async vehicle =>
                  await this.vehiclesService.detail(accident.id, vehicle.id),
              ),
            ),
          } as AccidentDetailDto),
      ),
    );
  }

  async create(accident: AccidentCreateDto): Promise<AccidentDetailDto> {
    const createdAccident = await this.accidentRepository.save({ ...accident });
    return {
      ...createdAccident,
      vehicles: [],
      actors: [],
    } as AccidentDetailDto;
  }

  async detail(id: number): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id, {
      relations: ['vehicles'],
    });
    if (!accident) {
      throw new NotFoundException();
    }
    const vehicles = await Promise.all(
      accident.vehicles.map(
        async vehicle => await this.vehiclesService.detail(id, vehicle.id),
      ),
    );
    return {
      ...accident,
      vehicles,
      actors: [],
    } as AccidentDetailDto;
  }

  async update(
    id: number,
    newAccident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id, {
      relations: ['vehicles'],
    });
    if (!accident) {
      throw new NotFoundException();
    }
    const updatedAccident = await this.accidentRepository.save({
      id,
      ...accident,
      ...newAccident,
    });
    const updatedVehicles = await Promise.all(
      updatedAccident.vehicles.map(
        async vehicle => await this.vehiclesService.detail(id, vehicle.id),
      ),
    );
    return {
      vehicles: updatedVehicles,
      ...updatedAccident,
      actors: [],
    } as AccidentDetailDto;
  }

  async delete(id: number): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id, {
      relations: ['vehicles'],
    });
    if (!accident) {
      throw new NotFoundException();
    }
    const vehicles = await Promise.all(
      accident.vehicles.map(
        async vehicle => await this.vehiclesService.detail(id, vehicle.id),
      ),
    );
    await this.accidentRepository.delete(id);
    return { ...accident, vehicles, actors: [] } as AccidentDetailDto;
  }
}
