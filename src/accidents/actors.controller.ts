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
import { ActorDetailDto } from './dto/actor-detail.dto';
import { ActorCreateDto } from './dto/actor-create.dto';

@Controller('api/accidents/:accidentId/actors')
@ApiUseTags('accidents')
export class ActorsController {
  @Get()
  @ApiOkResponse({
    description: 'List of actors of the accident',
    type: ActorDetailDto,
    isArray: true,
  })
  async list(): Promise<ActorDetailDto[]> {
    return [];
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created actor',
    type: ActorDetailDto,
  })
  async create(
    @Body(new ValidationPipe()) actor: ActorCreateDto,
  ): Promise<ActorDetailDto> {
    return { id: 1, ...actor };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Found actor in accident',
    type: ActorDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async detail(@Param('id') id: number): Promise<ActorDetailDto> {
    return { id };
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated actor',
    type: ActorDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) actor: ActorCreateDto,
  ): Promise<ActorDetailDto> {
    return { id, ...actor };
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted actor', type: ActorDetailDto })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async delete(@Param('id') id: number): Promise<ActorDetailDto> {
    return { id };
  }
}
