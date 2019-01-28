import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { PersonCreateDto } from './person-create.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { VehicleCreateDto } from './vehicle-create.dto';
import { VehicleDetailDto } from './vehicle-detail.dto';

export enum Role {
  Driver = 'Driver',
  Passenger = 'Passenger',
  Pedestrian = 'Pedestrian',
  Witness = 'Witness',
}

export enum Wounds {
  None = 'None',
  Light = 'Light',
  Medium = 'Medium',
  Severe = 'Severe',
  Death = 'Death',
}

export class ActorCreateDto extends PersonCreateDto {
  @ApiModelPropertyOptional({ enum: Object.keys(Role), example: Role.Witness })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiModelPropertyOptional()
  @IsOptional()
  vehicleId?: number;

  @ApiModelPropertyOptional({ enum: Object.keys(Wounds), example: Wounds.Medium })
  @IsEnum(Wounds)
  @IsOptional()
  wounds?: Wounds;
}
