import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AccidentsService } from '../services/accidents.service';
import { Accident } from '../entities/accident.entity';

@Controller('api/accidents')
@ApiUseTags('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of accidents',
    type: Accident,
    isArray: true,
  })
  async list(): Promise<Accident[]> {
    return this.accidentsService.list();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created accident',
    type: Accident,
  })
  async create(
    @Body(new ValidationPipe()) accident: Accident,
  ): Promise<Accident> {
    return this.accidentsService.create(accident);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Found accident', type: Accident })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async detail(@Param('id') id: number): Promise<Accident> {
    return this.accidentsService.detail(id);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated accident',
    type: Accident,
  })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) accident: Accident,
  ): Promise<Accident> {
    return this.accidentsService.update(id, accident);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted accident', type: Accident })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async delete(@Param('id') id: number): Promise<Accident> {
    return this.accidentsService.delete(id);
  }
}
