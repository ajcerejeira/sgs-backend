import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { AccidentCreateDto } from './dto/accident-create.dto';
import { Accident } from './accident.entity';
import { GeocoderService } from './geocoder.service';
import { AccidentDetailDto } from './dto/accident-detail.dto';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
    private readonly geocoderService: GeocoderService,
  ) {}

  async list(): Promise<AccidentDetailDto[]> {
    const accidents = await this.accidentRepository.find({
      relations: ['vehicles'],
    });
    const res = accidents.map(async (accident) => {
      const accidentDto = new AccidentDetailDto(accident);
      if (accident.location) {
        accidentDto.address = await this.geocoderService.getAddress(
          accident.location[0],
          accident.location[1],
        );
      }
      return accidentDto;
    });
    return await Promise.all(res);
  }

  async create(accident: AccidentCreateDto): Promise<AccidentDetailDto> {
    return new AccidentDetailDto(
      await this.accidentRepository.save({ ...accident, vehicles: [] }),
    );
  }

  async detail(id: number): Promise<AccidentDetailDto> {
    const accident = await this.accidentRepository.findOne(id, {
      relations: ['vehicles'],
    });
    if (!accident) {
      throw new NotFoundException('The requested accident could not be found');
    }
    const accidentDto = new AccidentDetailDto(accident);
    if (accident.location) {
      accidentDto.address = await this.geocoderService.getAddress(
        accident.location[0],
        accident.location[1],
      );
    }
    return accidentDto;
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

  async delete(id: number) {
    const accident = await this.accidentRepository.findOne(id);
    if (!accident) {
      throw new NotFoundException('The requested accident could not be found');
    }
    await this.accidentRepository.remove(accident);
  }
}
