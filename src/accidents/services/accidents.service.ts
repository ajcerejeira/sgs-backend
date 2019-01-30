import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as pdf from 'html-pdf';
import { Accident } from '../entities/accident.entity';
import { GoogleMapsService } from './google-maps.service';
import { FeatureCollection } from 'geojson';

@Injectable()
export class AccidentsService {
  constructor(
    @InjectRepository(Accident)
    private readonly accidentRepository: Repository<Accident>,
    private readonly googleMapsService: GoogleMapsService,
  ) {}

  async list(): Promise<Accident[]> {
    return await this.accidentRepository
      .createQueryBuilder('accident')
      .leftJoinAndSelect('accident.vehicles', 'vehicles')
      .leftJoinAndSelect('vehicles.meta', 'meta')
      .leftJoinAndSelect('accident.actors', 'actors')
      .leftJoinAndSelect('actors.person', 'person')
      .getMany();
  }

  async create(accident: Accident): Promise<Accident> {
    return await this.accidentRepository.save({
      ...accident,
      address: await this.googleMapsService.getAddress(
        accident.position[0],
        accident.position[1],
      ),
      mapUrl:
        accident.position && accident.position.length >= 2
          ? this.googleMapsService.getMapUrl(
              accident.position[0],
              accident.position[1],
              accident.sketch as FeatureCollection,
            )
          : null,
      vehicles: [],
      actors: [],
    });
  }

  async detail(id: number): Promise<Accident> {
    const accident = await this.accidentRepository
      .createQueryBuilder('accident')
      .leftJoinAndSelect('accident.vehicles', 'vehicles')
      .leftJoinAndSelect('vehicles.meta', 'meta')
      .leftJoinAndSelect('accident.actors', 'actors')
      .leftJoinAndSelect('actors.person', 'person')
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
      .set({
        ...accident,
        address:
          accident.position && accident.position.length >= 2
            ? await this.googleMapsService.getAddress(
                accident.position[0],
                accident.position[1],
              )
            : null,
        mapUrl:
          accident.position && accident.position.length >= 2
            ? this.googleMapsService.getMapUrl(
                accident.position[0],
                accident.position[1],
                accident.sketch as FeatureCollection,
              )
            : null,
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

  html2pdf(html: string, callback: (error: any, buffer: Buffer) => void): void {
    return pdf
      .create(html, {
        format: 'A4',
        orientation: 'portrait',
        type: 'pdf',
        zoomFactor: '1',
      })
      .toBuffer(callback);
  }
}
