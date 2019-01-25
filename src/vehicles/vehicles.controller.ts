import {
  Controller,
  Get,
  Body,
  ValidationPipe,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUseTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { VehicleDetailDto } from './dto/vehicle-detail.dto';
import { VehiclesService } from './vehicles.service';
import { VehicleCreateDto } from './dto/vehicle-create.dto';

@Controller('/api/vehicles')
@ApiUseTags('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @ApiOperation({ title: 'List all registered vehicles' })
  @ApiResponse({
    status: 200,
    description: 'List of vehicles',
    type: [VehicleDetailDto],
  })
  async list(): Promise<VehicleDetailDto[]> {
    return this.vehiclesService.list();
  }

  @Post()
  @ApiOperation({ title: 'Registers a new vehicle' })
  @ApiCreatedResponse({
    description: 'Created vehicle',
    type: VehicleDetailDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid body parameters' })
  async create(
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return this.vehiclesService.create(vehicle);
  }

  @Get(':id')
  @ApiOperation({ title: 'Gets the fields from a vehicle' })
  @ApiOkResponse({
    description: 'Vehicle with the given ID',
    type: VehicleDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  detail(@Param('id') id: number): Promise<VehicleDetailDto> {
    return this.vehiclesService.detail(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Updates the fields from a vehicle' })
  @ApiOkResponse({ description: 'Updated vehicle', type: VehicleDetailDto })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return this.vehiclesService.update(id, vehicle);
  }

  @Delete(':id')
  @ApiOperation({ title: 'Removes a vehicle' })
  @ApiOkResponse({ description: 'Removed vehicle', type: VehicleDetailDto })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  delete(@Param('id') id: number): Promise<VehicleDetailDto> {
    return this.vehiclesService.delete(id);
  }
}
