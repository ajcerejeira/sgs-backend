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
import { VehiclesService } from '../services/vehicles.service';
import { Vehicle } from '../entities/vehicle.entity';

@Controller('api/accidents/:accidentId/vehicles')
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
}
