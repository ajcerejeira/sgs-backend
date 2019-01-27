import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  Post,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { VehicleDetailDto } from './dto/vehicle-detail.dto';
import { VehicleCreateDto } from './dto/vehicle-create.dto';

@Controller('api/accidents/:accidentId/vehicles')
@ApiUseTags('accidents')
@ApiNotFoundResponse({ description: 'Accident not found' })
export class VehiclesController {
  @Get()
  @ApiOkResponse({
    description: 'List of vehicles of the accident',
    type: VehicleDetailDto,
    isArray: true,
  })
  async list(): Promise<VehicleDetailDto[]> {
    return [];
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created damages',
    type: VehicleDetailDto,
  })
  async create(
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return { id: 2, ...vehicle };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Found vehicle', type: VehicleDetailDto })
  async detail(@Param('id') id: number): Promise<VehicleDetailDto> {
    return { id: 4 };
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated vehicle',
    type: VehicleDetailDto,
  })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) vehicle: VehicleCreateDto,
  ): Promise<VehicleDetailDto> {
    return { id, ...vehicle };
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted vehicle',
    type: VehicleDetailDto,
  })
  async delete(@Param('id') id: number): Promise<VehicleDetailDto> {
    return { id };
  }
}
