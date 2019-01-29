import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accident } from '../entities/accident.entity';
import { VehiclesService } from './vehicles.service';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
  ) {}

  async list(): Promise<Accident[]> {
    return await this.accidentRepository
      .createQueryBuilder('accident')
      .leftJoinAndSelect('accident.vehicles', 'vehicles')
      .leftJoinAndSelect('vehicles.meta', 'meta')
      .getMany();
  }

  async create(accident: Accident): Promise<Accident> {
    return await this.accidentRepository.save({
      ...accident,
      vehicles: [],
      actors: [],
    });
  }

  async detail(id: number): Promise<Accident> {
    const accident = await this.accidentRepository
      .createQueryBuilder('accident')
      .leftJoinAndSelect('accident.vehicles', 'vehicles')
      .leftJoinAndSelect('vehicles.meta', 'meta')
      .where('accident.id = :id', { id })
      .getOne();
    if (!accident) {
      throw new NotFoundException();
    }
    return accident;
  }

  async update(id: number, accident: Accident): Promise<Accident> {
    await this.accidentRepository
      .createQueryBuilder('accident')
      .update()
      .set({ ...accident })
      .where('accident.id = :id', { id })
      .execute();
    return await this.detail(id);
  }

  async delete(id: number): Promise<Accident> {
    const accident = await this.detail(id);
    await this.accidentRepository.delete(id);
    return accident;
  }
}
