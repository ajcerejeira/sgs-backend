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
import { AccidentDetailDto } from './dto/accident-detail.dto';
import { AccidentCreateDto } from './dto/accident-create.dto';

@Controller('api/accidents')
@ApiUseTags('accidents')
export class AccidentsController {
  @Get()
  @ApiOkResponse({
    description: 'List of accidents',
    type: AccidentDetailDto,
    isArray: true,
  })
  async list(): Promise<AccidentDetailDto[]> {
    return [];
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created accident',
    type: AccidentDetailDto,
  })
  async create(
    @Body(new ValidationPipe()) accident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    return { id: 1, ...accident, vehicles: [], actors: [] };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Found accident', type: AccidentDetailDto })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async detail(@Param('id') id: number): Promise<AccidentDetailDto> {
    return { id, vehicles: [], actors: [] };
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
    return { id, ...accident, vehicles: [], actors: [] };
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted accident', type: AccidentDetailDto })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async delete(@Param('id') id: number): Promise<AccidentDetailDto> {
    return { id, vehicles: [], actors: [] };
  }
}
