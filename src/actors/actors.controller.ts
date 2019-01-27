import {
  Controller,
  Get,
  Post,
  ValidationPipe,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import {
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { ActorDetailDto } from './dto/actor-detail.dto';
import { ActorCreateDto } from './dto/actor-create.dto';

@Controller('/api/actors')
@ApiUseTags('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  @ApiOperation({ title: 'List all registered actors' })
  @ApiResponse({
    status: 200,
    description: 'List of actors',
    type: [ActorDetailDto],
  })
  async list(): Promise<ActorDetailDto[]> {
    return this.actorsService.list();
  }

  @Post()
  @ApiOperation({ title: 'Registers a new actor' })
  @ApiCreatedResponse({
    description: 'Created actor',
  })
  @ApiBadRequestResponse({ description: 'Invalid body parameters' })
  async create(@Body(new ValidationPipe()) actor: ActorCreateDto) {
    return this.actorsService.create(actor);
  }

  @Get(':id')
  @ApiOperation({ title: 'Gets the fields from an actor' })
  @ApiOkResponse({
    description: 'Actor with the given ID',
    type: ActorDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  detail(@Param('id') id: number): Promise<ActorDetailDto> {
    return this.actorsService.detail(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Updates the fields from an actor' })
  @ApiOkResponse({ description: 'Updated actor', type: ActorDetailDto })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) actor: ActorCreateDto,
  ): Promise<ActorDetailDto> {
    return this.actorsService.update(id, actor);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Removes an actor' })
  @ApiOkResponse({ description: 'Removed actor' })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  delete(@Param('id') id: number) {
    return this.actorsService.delete(id);
  }
}
