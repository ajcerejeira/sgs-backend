import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accident } from '../entities/accident.entity';

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
      mapUrl: accident.position && accident.position.length >= 2 ? `https://maps.googleapis.com/maps/api/staticmap?center=${accident.position[0]},${accident.position[1]}&zoom=19&size=400x200&key=AIzaSyDJ3xMYDRkdSoSpIERsYylJWqmv3D-rpXs` : '',
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
      .set({ ...accident, mapUrl: accident.position && accident.position.length >= 2 ? `https://maps.googleapis.com/maps/api/staticmap?center=${accident.position[0]},${accident.position[1]}&zoom=19&size=1000x1000&key=AIzaSyDJ3xMYDRkdSoSpIERsYylJWqmv3D-rpXs` : '',
    })
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
