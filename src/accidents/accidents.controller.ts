import { Controller, Get } from '@nestjs/common';
import { AccidentDto } from './dto/accident.dto';

@Controller('api/accidents')
export class AccidentsController {
  @Get()
  async list(): Promise<AccidentDto[]> {
    return [];
  }
}
