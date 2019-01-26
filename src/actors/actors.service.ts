import { Injectable, NotFoundException } from '@nestjs/common';
import { Actor } from './actor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorDetailDto } from './dto/actor-detail.dto';
import { ActorCreateDto } from './dto/actor-create.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async list(): Promise<ActorDetailDto[]> {
    const actors = await this.actorRepository.find();
    return actors;
  }

  async create(actor: ActorCreateDto): Promise<ActorDetailDto> {
    return new ActorDetailDto(await this.actorRepository.save(actor));
  }

  async detail(id: number): Promise<ActorDetailDto> {
    const actor = await this.actorRepository.findOne(id);
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
