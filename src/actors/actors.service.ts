import { Injectable, NotFoundException } from '@nestjs/common';
import { Actor } from './actor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorDetailDto } from './dto/actor-detail.dto';
import { ActorCreateDto } from './dto/actor-create.dto';
import { Accident } from '../accidents/accident.entity';
import { Vehicle } from '../vehicles/vehicle.entity';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async list(): Promise<ActorDetailDto[]> {
    const actors = await this.actorRepository.find({
      relations: ['accident', 'vehicle'],
    });
    return actors.map(actor => new ActorDetailDto(actor));
  }

  async create(actor: ActorCreateDto): Promise<ActorDetailDto> {
    const newActor = await this.actorRepository.save({
      ...actor,
      accident: await this.accidentRepository.findOne(actor.accident),
      vehicle: await this.vehicleRepository.findOne(actor.vehicle),
    });
    return new ActorDetailDto(newActor);
  }

  async detail(id: number): Promise<ActorDetailDto> {
    const actor = await this.actorRepository.findOne(id, {
      relations: ['accident', 'vehicle'],
    });
    console.log(actor);
    if (!actor) {
      throw new NotFoundException('The requested actor could not be found');
    }
    return new ActorDetailDto(actor);
  }

  async update(id: number, newActor: ActorCreateDto): Promise<ActorDetailDto> {
    const actor = await this.actorRepository.findOne(id);
    if (!actor) {
      throw new NotFoundException('The requested actor could not be found');
    }
    const updatedActor = await this.actorRepository.save({
      id,
      ...actor,
      ...newActor,
      accident: await this.accidentRepository.findOne(newActor.accident),
      vehicle: await this.vehicleRepository.findOne(newActor.vehicle),
    });
    return new ActorDetailDto(updatedActor);
  }

  async delete(id: number) {
    const actor = await this.actorRepository.findOne(id);
    if (!actor) {
      throw new NotFoundException('The requested accident could not be found');
    }
    await this.actorRepository.remove(actor);
  }
}
