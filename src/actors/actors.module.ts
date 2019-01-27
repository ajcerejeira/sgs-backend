import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { Actor } from './actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorsService } from './actors.service';
import { Accident } from '../accidents/accident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actor, Accident])],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
