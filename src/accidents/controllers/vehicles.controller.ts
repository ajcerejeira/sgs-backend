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

@Controller('api/accidents/:accidentId/vehicles')
@ApiUseTags('accidents')
export class VehiclesController {
  @Get()
  @ApiOkResponse({
    description: 'List of vehicles of the accident',
    type: VehicleDetailDto,
    isArray: true,
  })
  async list(
    @Param('accidentId') accidentId: string,
  ): Promise<VehicleDetailDto[]> {
    return [];
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created vehicle',
    type: VehicleDetailDto,
  })
  async create(
    @Param('accidentId') accidentId: string,
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return { id: 1, ...vehicle };
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Found vehicle in accident',
    type: VehicleDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async detail(
    @Param('accidentId') accidentId: string,
    @Param('id') id: number,
  ): Promise<VehicleDetailDto> {
    return { id };
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated vehicle',
    type: VehicleDetailDto,
  })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async update(
    @Param('accidentId') accidentId: string,
    @Param('id') id: number,
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return { id, ...vehicle };
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted vehicle', type: VehicleDetailDto })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async delete(
    @Param('accidentId') accidentId: string,
    @Param('id') id: number,
  ): Promise<VehicleDetailDto> {
    return { id };
  }
}
