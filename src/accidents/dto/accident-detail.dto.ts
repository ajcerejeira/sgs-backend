import {
  IsDate,
  IsArray,
  IsNumber,
  IsOptional,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';
import { Accident } from '../accident.entity';
import { VehicleDetailDto } from '../../vehicles/dto/vehicle-detail.dto';
import { GeocoderService } from '../geocoder.service';
import { ActorDetailDto } from '../../actors/dto/actor-detail.dto';

export class AccidentDetailDto {
  @IsNumber()
  @ApiModelProperty()
  id: number;

  @IsDateString()
  @IsOptional()
  @ApiModelPropertyOptional({ format: 'date', type: 'string' })
  date?: string;

  @IsArray()
  @IsOptional()
  @ApiModelProperty({ type: [Number] })
  location?: number[];

  @IsOptional()
  @ApiModelPropertyOptional({ example: 'Rua da Ponte, 47 Lousado' })
  address?: string;

  @IsUrl()
  @ApiModelPropertyOptional()
  mapImg?: string;

  @IsArray()
  @ApiModelProperty()
  vehicles: VehicleDetailDto[];

  @IsArray()
  @ApiModelProperty()
  actors: ActorDetailDto[];

  constructor(accident: Accident) {
    this.id = accident.id;
    this.date = accident.date;
    this.location = accident.location;
    this.address = null;
    this.mapImg = this.location && this.location.length >= 2 ?  `https://maps.googleapis.com/maps/api/staticmap?center=${this.location[0]},${this.location[1]}&zoom=19&size=400x200&key=AIzaSyDJ3xMYDRkdSoSpIERsYylJWqmv3D-rpXs` : null;
    this.vehicles = accident.vehicles ? accident.vehicles.map(
      vehicle => new VehicleDetailDto({ ...vehicle, accident: accident }),
    ) : [];
    this.actors = accident.actors ? accident.actors.map(
      actor => new ActorDetailDto({ ...actor, accident: accident }),
    ) : [];
  }

  async loadAddress(geocoder: GeocoderService) {
    if (this.location && this.location.length >= 2) {
      this.address = await geocoder.getAddress(this.location[0], this.location[1]);
    }
  }
}
