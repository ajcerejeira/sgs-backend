import { Module } from '@nestjs/common';
import { ActorsController } from './actors.controller';
import { Actor } from './actor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  controllers: [ActorsController],
})
export class ActorsModule {}
