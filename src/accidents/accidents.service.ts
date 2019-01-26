import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { AccidentCreateDto } from './dto/accident-create.dto';
import { Accident } from './accident.entity';
import { AccidentDetailDto } from './dto/accident-detail.dto';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
  ) {}

  async list(): Promise<AccidentDetailDto[]> {
    const accidents = await this.accidentRepository.find({ relations: ['vehicles'] });
    return accidents.map(accident => new AccidentDetailDto(accident));
  }

  async create(accident: AccidentCreateDto): Promise<AccidentDetailDto> {
    const newAccident = new Accident();
    newAccident.date = accident.date;
    newAccident.location = accident.location;
    newAccident.vehicles = [];
    return new AccidentDetailDto(
      await this.accidentRepository.save(newAccident),
    );
  }

  async detail(id: number): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id,  { relations: ['vehicles'] });
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
}
