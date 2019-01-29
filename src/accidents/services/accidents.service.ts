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
    const accidents = await this.accidentRepository
      .createQueryBuilder('accident')
      .leftJoinAndSelect('accident.vehicles', 'vehicles')
      .leftJoinAndSelect('vehicles.meta', 'meta')
      .getMany();
    return accidents.map(accident => ({ ...accident, actors: [] }));
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
    const accident = await this.accidentRepository
      .createQueryBuilder('accident')
      .leftJoinAndSelect('accident.vehicles', 'vehicles')
      .leftJoinAndSelect('vehicles.meta', 'meta')
      .where('accident.id = :id', { id })
      .getOne();
    if (!accident) {
      throw new NotFoundException();
    }
    return { ...accident, actors: [] };
  }

  async update(
    id: number,
    accident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    await this.accidentRepository
      .createQueryBuilder('accident')
      .update()
      .set({ ...accident })
      .where('accident.id = :id', { id })
      .execute();
    return await this.detail(id);
  }

  async delete(id: number): Promise<AccidentDetailDto> {
    const accident = await this.detail(id);
    await this.accidentRepository.delete(id);
    return accident;
  }
}
