import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  Res,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUseTags,
  ApiOperation,
  ApiProduces,
} from '@nestjs/swagger';
import { AccidentsService } from '../services/accidents.service';
import { Accident } from '../entities/accident.entity';
import { Response } from 'express';

@Controller('api/accidents')
@ApiUseTags('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of accidents',
    type: Accident,
    isArray: true,
  })
  async list(): Promise<Accident[]> {
    return this.accidentsService.list();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created accident',
    type: Accident,
  })
  async create(
    @Body(new ValidationPipe()) accident: Accident,
  ): Promise<Accident> {
    return this.accidentsService.create(accident);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Found accident', type: Accident })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async detail(@Param('id') id: number): Promise<Accident> {
    return this.accidentsService.detail(id);
  }

  @Put(':id')
  @ApiCreatedResponse({
    description: 'Updated accident',
    type: Accident,
  })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) accident: Accident,
  ): Promise<Accident> {
    return this.accidentsService.update(id, accident);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted accident', type: Accident })
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async delete(@Param('id') id: number): Promise<Accident> {
    return this.accidentsService.delete(id);
  }

  @Get(':id/report')
  @ApiOperation({ title: 'Generates the PDF report of the accident' })
  @ApiOkResponse({ description: 'Report of the accident' })
  @ApiProduces('application-pdf')
  @ApiNotFoundResponse({ description: 'Accident not found' })
  async report(@Param('id') id: number, @Res() res: Response) {
    const accident = await this.accidentsService.detail(id);
    const logo = 'https://i.imgur.com/cX2gyUg.png';

    const banner = 'https://i.imgur.com/jhsXIqF.jpg';
    res.render('report.hbs', { accident, banner, logo }, async (err, html) => {
      this.accidentsService.html2pdf(html, (pdfErr, buffer) => {
        res.contentType('application/pdf');
        res.end(buffer);
      });
    });
  }
}
