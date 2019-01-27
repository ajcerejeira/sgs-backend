import { LocationDto } from './location.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsOptional, ValidateNested } from 'class-validator';

export class AccidentCreateDto {
  @ApiModelPropertyOptional({
    type: 'string',
    format: 'date',
    example: new Date(),
  })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiModelPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;
}
