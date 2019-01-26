import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUseTags,
  ApiResponse,
} from '@nestjs/swagger';
import { AccidentCreateDto } from './dto/accident-create.dto';
import { AccidentsService } from './accidents.service';
import { AccidentDetailDto } from './dto/accident-detail.dto';

@Controller('/api/accidents')
@ApiUseTags('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  @ApiOperation({ title: 'List all registered accidents' })
  @ApiResponse({
    status: 200,
    description: 'List of accidents',
    type: [AccidentDetailDto],
  })
  async list(): Promise<AccidentDetailDto[]> {
    return this.accidentsService.list();
  }

  @Post()
  @ApiOperation({ title: 'Registers a new accident' })
  @ApiCreatedResponse({
    description: 'Created accident',
  })
  @ApiBadRequestResponse({ description: 'Invalid body parameters' })
  async create(@Body(new ValidationPipe()) accident: AccidentCreateDto) {
    return this.accidentsService.create(accident);
  }

  @Get(':id')
  @ApiOperation({ title: 'Gets the fields from an accident' })
  @ApiOkResponse({
    description: 'Accident with the given ID',
    type: AccidentDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  detail(@Param('id') id: number): Promise<AccidentDetailDto> {
    return this.accidentsService.detail(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Updates the fields from an accident' })
  @ApiOkResponse({ description: 'Updated accident', type: AccidentDetailDto })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) accident: AccidentCreateDto,
  ): Promise<AccidentDetailDto> {
    return this.accidentsService.update(id, accident);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Removes an accident' })
  @ApiOkResponse({ description: 'Removed accident', type: AccidentDetailDto })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  delete(@Param('id') id: number): Promise<AccidentDetailDto> {
    return this.accidentsService.delete(id);
  }
}
