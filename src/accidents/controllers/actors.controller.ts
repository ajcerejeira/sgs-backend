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
import { Actor } from '../entities/actor';

@Controller('api/accidents/:accidentId/actors')
@ApiUseTags('accidents')
export class ActorsController {
  @Get()
  @ApiOkResponse({
    description: 'List of actors of the accident',
    type: Actor,
    isArray: true,
  })
  async list(): Promise<Actor[]> {
    return [];
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created actor',
    type: Actor,
  })
  async create(@Body(new ValidationPipe()) actor: Actor): Promise<Actor> {
    return { id: 1, ...actor };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Found actor in accident',
    type: Actor,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async detail(@Param('id') id: number): Promise<Actor> {
    return { id, person: { id: 4 } };
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated actor',
    type: Actor,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) actor: Actor,
  ): Promise<Actor> {
    return { id, ...actor };
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted actor', type: Actor })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async delete(@Param('id') id: number): Promise<Actor> {
    return { id, person: { id: 4 } };
  }
}
