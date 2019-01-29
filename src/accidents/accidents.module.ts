import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accident } from './entities/accident.entity';
import { AccidentExistsMiddleware } from './middlewares/accident-exists.middleware';
import { AccidentsController } from './controllers/accidents.controller';
import { AccidentsService } from './services/accidents.service';
import { Actor } from './entities/actor.entity';
import { ActorsController } from './controllers/actors.controller';
import { Person } from './entities/person.entity';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleMeta } from './entities/vehicle-meta.entity';
import { VehiclesController } from './controllers/vehicles.controller';
import { VehiclesService } from './services/vehicles.service';
import { ActorsService } from './services/actors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accident, Actor, Person, Vehicle, VehicleMeta]),
  ],
  controllers: [AccidentsController, ActorsController, VehiclesController],
  providers: [AccidentsService, ActorsService, VehiclesService],
})
export class AccidentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccidentExistsMiddleware)
      .with('id')
      .forRoutes('api/accidents/:id/');
  }
}
