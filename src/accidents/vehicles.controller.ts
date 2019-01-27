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
import { VehicleDetailDamageDto } from './dto/vehicle-damages-detail.dto';
import { VehicleCreateDamageDto } from './dto/vehicle-damages-create.dto';

@Controller('api/accidents/:accidentId/vehicles')
@ApiUseTags('accidents')
@ApiNotFoundResponse({ description: 'Accident not found' })
export class VehiclesController {
  @Get()
  @ApiOkResponse({
    description: 'List of vehicles of the accident',
    type: VehicleDetailDamageDto,
    isArray: true,
  })
  async list(): Promise<VehicleDetailDamageDto[]> {
    return [];
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created damages',
    type: VehicleDetailDamageDto,
  })
  async create(
    @Body(new ValidationPipe()) vehicle: VehicleCreateDamageDto,
  ): Promise<VehicleDetailDamageDto> {
    return { id: 2, damages: [] };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Found vehicle', type: VehicleDetailDamageDto })
  async detail(@Param('id') id: number): Promise<VehicleDetailDamageDto> {
    return { id: 4, damages: [] };
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated vehicle',
    type: VehicleDetailDamageDto,
  })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) vehicle: VehicleCreateDamageDto,
  ): Promise<VehicleDetailDamageDto> {
    return { id, ...vehicle };
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Deleted vehicle',
    type: VehicleDetailDamageDto,
  })
  async delete(@Param('id') id: number): Promise<VehicleDetailDamageDto> {
    return { id, damages: [] };
  }
}
