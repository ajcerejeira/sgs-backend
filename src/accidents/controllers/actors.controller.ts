import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUseTags,
  ApiProduces,
} from '@nestjs/swagger';
import { Actor } from '../entities/actor.entity';
import { ActorsService } from '../services/actors.service';

@Controller('api/accidents/:accidentId/actors')
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('accidents')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of actors of the accident',
    type: Actor,
    isArray: true,
  })
  async list(@Param('accidentId') accidentId: number): Promise<Actor[]> {
    return this.actorsService.list(accidentId);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created actor',
    type: Actor,
  })
  async create(
    @Param('accidentId') accidentId: number,
    @Body(new ValidationPipe()) actor: Actor,
    @UploadedFile() signature?
  ): Promise<Actor> {
    return this.actorsService.create(accidentId, actor);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Found actor in accident',
    type: Actor,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async detail(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
  ): Promise<Actor> {
    return this.actorsService.detail(accidentId, id);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated actor',
    type: Actor,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async update(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
    @Body(new ValidationPipe()) actor: Actor,
  ): Promise<Actor> {
    return this.actorsService.update(accidentId, id, actor);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted actor', type: Actor })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async delete(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
  ): Promise<Actor> {
    return this.actorsService.delete(accidentId, id);
  }
}
