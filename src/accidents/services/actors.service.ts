import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';
import { Person } from '../entities/person.entity';
import { VehiclesService } from './vehicles.service';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @Inject(forwardRef(() => VehiclesService))
    private readonly vehiclesService: VehiclesService,
  ) {}

  async list(accidentId: number): Promise<Actor[]> {
    return await this.actorRepository
      .createQueryBuilder('actor')
      .leftJoinAndSelect('actor.person', 'person')
      .leftJoinAndSelect('actor.vehicle', 'vehicle')
      .leftJoinAndSelect('vehicle.meta', 'meta')
      .where('actor.accident.id = :accidentId', { accidentId })
      .getMany();
  }

  async create(accidentId: number, actor: Actor): Promise<Actor> {
    const person = await this.personRepository.save(actor.person);
    const createdActor = await this.actorRepository.save({
      accident: accidentId,
      ...actor,
      vehicle:
        actor.vehicle && actor.vehicle.id
          ? await this.vehiclesService.detail(accidentId, actor.vehicle.id)
          : null,
      person,
    });
    return createdActor;
  }

  async detail(accidentId: number, actorId: number): Promise<Actor> {
    const actor = await this.actorRepository
      .createQueryBuilder('actor')
      .leftJoinAndSelect('actor.person', 'person')
      .leftJoinAndSelect('actor.vehicle', 'vehicle')
      .leftJoinAndSelect('vehicle.meta', 'meta')
      .where('actor.accident.id = :accidentId', { accidentId })
      .andWhere('actor.id = :actorId', { actorId })
      .getOne();
    if (!actor) {
      throw new NotFoundException();
    }
    return actor;
  }

  async update(
    accidentId: number,
    actorId: number,
    newActor: Actor,
  ): Promise<Actor> {
    const oldActor = await this.detail(accidentId, actorId);
    const oldPerson = await this.personRepository.findOne({
      identityDocumentNumber: oldActor.person.identityDocumentNumber,
    });
    const newPerson = await this.personRepository.save({
      ...oldPerson,
      ...newActor.person,
    });
    return await this.actorRepository.save({
      ...oldActor,
      ...newActor,
      vehicle:
        newActor.vehicle && newActor.vehicle.id
          ? await this.vehiclesService.detail(accidentId, newActor.vehicle.id)
          : null,
      person: newPerson,
    });
  }

  async delete(accidentId: number, actorId: number): Promise<Actor> {
    const actor = this.detail(accidentId, actorId);
    await this.actorRepository.delete(actorId);
    return actor;
  }
}
