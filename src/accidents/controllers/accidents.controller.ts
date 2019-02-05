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
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUseTags,
  ApiOperation,
  ApiProduces,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccidentsService } from '../services/accidents.service';
import { Accident } from '../entities/accident.entity';
import { Response } from 'express';
import { User } from '../../users/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/accidents')
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('accidents')
export class AccidentsController {
  constructor(private readonly accidentsService: AccidentsService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOkResponse({
    description: 'List of accidents',
    type: Accident,
    isArray: true,
  })
  @ApiBearerAuth()
  async list(@Req() req: any): Promise<Accident[]> {
    const user: User = req.user;
    return this.accidentsService.list(user);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiCreatedResponse({
    description: 'Created accident',
    type: Accident,
  })
  @ApiBearerAuth()
  async create(
    @Body(new ValidationPipe()) accident: Accident,
    @Req() req: any
  ): Promise<Accident> {
    const user: User = req.user;
    return this.accidentsService.create(accident, user);
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
    const damagesUrl = {
      topleft: 'https://i.imgur.com/ANn3CwX.png',
      topcenter: 'https://i.imgur.com/1pAj9yo.png',
      topright: 'https://i.imgur.com/AHcUdRG.png',
      midleft: 'https://i.imgur.com/QbIloR1.png',
      midcenter: 'https://i.imgur.com/4RC8rgC.png',
      midright: 'https://i.imgur.com/AtT3tI5.png',
      botleft: 'https://i.imgur.com/Fixw4Ra.png',
      botcenter: 'https://i.imgur.com/NuIoBuI.png',
      botright: 'https://i.imgur.com/Z3AM4Tt.png',
    };
    for (const vehicle of accident.vehicles) {
      (vehicle as any).damageOpacities = {
        topleft: 0,
        topcenter: 0,
        topright: 0,
        midleft: 0,
        midcenter: 0,
        midright: 0,
        botleft: 0,
        botcenter: 0,
        botright: 0,
      };
      for (const damage of vehicle.damages) {
        const opacity = Object.keys(damagesUrl)[damage];
        (vehicle as any).damageOpacities[opacity] = 0.4;
      }
      for (let i = 0; i < vehicle.pictures.length; i++) {
        (vehicle.pictures[i] as any) = `https://sgs-backend.herokuapp.com/api/accidents/${accident.id}/vehicles/${vehicle.id}/pictures/${i}`;
      }
    }
    //res.render('report.hbs', { accident, banner, logo, damagesUrl });
    res.render('report.hbs', { accident, banner, logo }, async (err, html) => {
      this.accidentsService.html2pdf(html, (pdfErr, buffer) => {
        res.contentType('application/pdf');
        res.end(buffer);
      });
    });
  }
}
