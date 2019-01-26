import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { Actor } from './actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsService } from './actors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
