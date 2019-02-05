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
  FileInterceptor,
  UploadedFile,
  Res,
  NotFoundException,
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
import { Response } from 'express';

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
  @UseInterceptors(FileInterceptor('signature'))
  async create(
    @Param('accidentId') accidentId: number,
    @Body(new ValidationPipe()) actor: Actor,
    @UploadedFile() signature?
  ): Promise<Actor> {
    console.log(accidentId, actor);
    if (signature) {
      actor.signature = signature.buffer;
      actor.mimetype = 'image/png';
    }
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
  @UseInterceptors(FileInterceptor('signature'))
  @ApiCreatedResponse({
    description: 'Updated actor',
    type: Actor,
  })
  @ApiNotFoundResponse({ description: 'Actor not found' })
  async update(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
    @Body(new ValidationPipe()) actor: Actor,
    @UploadedFile() signature?,
  ): Promise<Actor> {
    if (signature) {
      actor.signature = signature.buffer;
      actor.mimetype = 'image/png';
    }
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

  @Get(':id/signature')
  @ApiOkResponse({ description: 'Picture of the user signature' })
  @ApiProduces('image/jpeg', 'image/jpg', 'image/png')
  async signature( @Param('accidentId') accidentId: number, @Param('id') id: number, @Res() res: Response) {
    const actor = await this.actorsService.detail(accidentId, id);
    if (actor.signature) {
      res.setHeader('Content-Type', actor.mimetype);
      res.end(actor.signature, 'utf8');
    } else {
      throw new NotFoundException();
    }
  }
}
