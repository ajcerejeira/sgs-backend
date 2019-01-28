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
import { VehicleDetailDto } from '../dto/vehicle-detail.dto';
import { VehicleCreateDto } from '../dto/vehicle-create.dto';
import { VehiclesService } from '../services/vehicles.service';

@Controller('api/accidents/:accidentId/vehicles')
@ApiUseTags('accidents')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {
    this.vehiclesService = vehiclesService;
  }

  @Get()
  @ApiOkResponse({
    description: 'List of vehicles of the accident',
    type: VehicleDetailDto,
    isArray: true,
  })
  async list(
    @Param('accidentId') accidentId: number,
  ): Promise<VehicleDetailDto[]> {
    return this.vehiclesService.list(accidentId);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created vehicle',
    type: VehicleDetailDto,
  })
  async create(
    @Param('accidentId') accidentId: number,
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return this.vehiclesService.create(accidentId, vehicle);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Found vehicle in accident',
    type: VehicleDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async detail(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
  ): Promise<VehicleDetailDto> {
    return this.vehiclesService.detail(accidentId, id);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated vehicle',
    type: VehicleDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async update(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return this.vehiclesService.update(accidentId, id, vehicle);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted vehicle', type: VehicleDetailDto })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async delete(
    @Param('accidentId') accidentId: number,
    @Param('id') id: number,
  ): Promise<VehicleDetailDto> {
    return this.vehiclesService.delete(accidentId, id);
  }
}
