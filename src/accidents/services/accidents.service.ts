import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accident } from '../entities/accident.entity';
import { Repository } from 'typeorm';
import { AccidentCreateDto } from '../dto/accident-create.dto';
import { AccidentDetailDto } from '../dto/accident-detail.dto';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
  ) {}

  async create(accident: AccidentCreateDto): Promise<AccidentDetailDto> {
    return null;
  }
}
