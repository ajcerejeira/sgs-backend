import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class AccidentCreateDto {
  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiModelPropertyOptional({
    type: 'number',
    isArray: true,
    example: [51.532041, -0.124228],
  })
  @IsOptional()
  position?: number[];

  @ApiModelPropertyOptional({
    type: 'string',
    example: 'Kings Cross, Londres, United Kingdom',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiModelPropertyOptional({
    type: 'string',
    format: 'url',
    example:
      'https://maps.googleapis.com/maps/api/staticmap?center=51.532041,-0.1242288&zoom=19&size=400x200',
  })
  @IsUrl()
  @IsOptional()
  mapUrl?: string;
}
