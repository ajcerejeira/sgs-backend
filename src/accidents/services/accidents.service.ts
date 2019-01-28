import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accident } from '../entities/accident.entity';
import { AccidentCreateDto } from '../dto/accident-create.dto';
import { AccidentDetailDto } from '../dto/accident-detail.dto';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
  ) {}

  async list(): Promise<AccidentDetailDto[]> {
    const accidents = await this.accidentRepository.find();
    return accidents.map(accident => ({ ...accident, vehicles: [] } as AccidentDetailDto));
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
    const accident = await this.accidentRepository.findOne(id);
    if (!accident) {
      throw new NotFoundException();
    }
    return { ...accident, vehicles: [], actors: [] } as AccidentDetailDto;
  }

  async update(
    id: number,
    newAccident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id);
    if (!accident) {
      throw new NotFoundException();
    }
    const updatedAccident = await this.accidentRepository.save({
      id,
      ...accident,
      ...newAccident,
    });
    return {
      ...updatedAccident,
      vehicles: [],
      actors: [],
    } as AccidentDetailDto;
  }

  async delete(id: number): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id);
    if (!accident) {
      throw new NotFoundException();
    }
    await this.accidentRepository.remove(accident);
    return { ...accident, vehicles: [], actors: [] } as AccidentDetailDto;
  }

  async exists(id: number): Promise<boolean> {
    const accident = await this.accidentRepository.findOne(id);
    return accident !== null;
  }
}
