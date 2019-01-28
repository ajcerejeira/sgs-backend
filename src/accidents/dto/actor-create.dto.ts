import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { PersonCreateDto } from './person-create.dto';
import { IsOptional, IsEnum } from 'class-validator';

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
  @ApiModelPropertyOptional({ enum: Object.keys(Role), default: Role.Witness })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiModelPropertyOptional({ enum: Object.keys(Wounds), default: Wounds.Medium })
  @IsEnum(Wounds)
  @IsOptional()
  wounds?: Wounds;
}
