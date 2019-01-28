import { Module } from '@nestjs/common';
import { AccidentsController } from './accidents.controller';

@Module({
  controllers: [AccidentsController],
})
export class AccidentsModule {}
