import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccidentsModule } from './accidents/accidents.module';

@Module({
  imports: [AccidentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
