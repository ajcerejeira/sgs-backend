import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  UploadedFile,
  FileInterceptor,
  UseInterceptors,
  Res,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { VehiclesService } from '../services/vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';
import { Response } from 'express';

@Controller('api/accidents/:accidentId/vehicles')
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('accidents')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {
    this.vehiclesService = vehiclesService;
  }

  @Get()
  @ApiOkResponse({
    description: 'List of vehicles of the accident',
    type: Vehicle,
    isArray: true,
  })
  async list(@Param('accidentId') accidentId: number): Promise<Vehicle[]> {
    return this.vehiclesService.list(accidentId);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created vehicle',
    type: Vehicle,
  })
  async create(
    @Param('accidentId') accidentId: number,
    @Body(new ValidationPipe()) vehicle: Vehicle,
  ): Promise<Vehicle> {
    return this.vehiclesService.create(accidentId, vehicle);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Found vehicle in accident',
    type: Vehicle,
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async detail(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
  ): Promise<Vehicle> {
    return this.vehiclesService.detail(accidentId, id);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated vehicle',
    type: Vehicle,
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async update(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
    @Body(new ValidationPipe()) vehicle: Vehicle,
  ): Promise<Vehicle> {
    return this.vehiclesService.update(accidentId, id, vehicle);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted vehicle', type: Vehicle })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async delete(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
  ): Promise<Vehicle> {
    return this.vehiclesService.delete(accidentId, id);
  }

  @Get(':id/pictures')
  @ApiOkResponse({ description: 'Photo gallery' })
  async getPictures(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
  ): Promise<string[]> {
    const vehicle = await this.vehiclesService.detail(accidentId, id);
    let pictures = [];
    if (vehicle.pictures) {
      for (let i = 0; i < vehicle.pictures.length; i++) {
        pictures.push(`https://sgs-backend.herokuapp.com/api/accidents/${accidentId}/vehicles/${id}/pictures/${i}`);
      }
    }
    return pictures;
  }

  @Get(':vehicleId/pictures/:id')
  async getPicture(
    @Param('accidentId') accidentId: number,
    @Param('vehicleId') vehicleId: number,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const vehicle = await this.vehiclesService.detail(accidentId, vehicleId);
    if (vehicle.pictures) {
      const picture = vehicle.pictures[id];
      res.setHeader('Content-Type', 'image/jpg');
      res.end(picture, 'utf8');
    }
  }

  @Post(':id/pictures')
  @ApiCreatedResponse({ description: 'Uploaded photo ' })
  @UseInterceptors(FileInterceptor('picture'))
  async addPicture(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
    @UploadedFile() picture,
  ) {
    console.log(picture)
    const vehicle = await this.vehiclesService.detail(accidentId, id);
    if (vehicle.pictures) {
      vehicle.pictures.push(picture.buffer);
    } else {
      vehicle.pictures = [picture.buffer];
    }
    return this.vehiclesService.update(accidentId, id, { pictures: vehicle.pictures } as any);
  }
}
