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
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AccidentsService } from '../services/accidents.service';
import { AccidentDetailDto } from '../dto/accident-detail.dto';
import { AccidentCreateDto } from '../dto/accident-create.dto';

@Controller('api/accidents')
@ApiUseTags('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of accidents',
    type: AccidentDetailDto,
    isArray: true,
  })
  async list(): Promise<AccidentDetailDto[]> {
    return this.accidentsService.list();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created accident',
    type: AccidentDetailDto,
  })
  async create(
    @Body(new ValidationPipe()) accident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    return this.accidentsService.create(accident);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Found accident', type: AccidentDetailDto })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async detail(@Param('id') id: number): Promise<AccidentDetailDto> {
    return this.accidentsService.detail(id);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated accident',
    type: AccidentDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) accident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    return this.accidentsService.update(id, accident);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted accident', type: AccidentDetailDto })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async delete(@Param('id') id: number): Promise<AccidentDetailDto> {
    return this.accidentsService.delete(id);
  }
}
