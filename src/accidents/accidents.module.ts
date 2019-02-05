import {
  Module,
  NestModule,
  MiddlewareConsumer,
  HttpModule,
} from '@nestjs/common';
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
import { GoogleMapsService } from './services/google-maps.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accident, Actor, Person, Vehicle, VehicleMeta, User]),
    HttpModule,
    UsersModule,
  ],
  controllers: [AccidentsController, ActorsController, VehiclesController],
  providers: [
    AccidentsService,
    ActorsService,
    GoogleMapsService,
    VehiclesService,
  ],
})
export class AccidentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccidentExistsMiddleware)
      .with('id')
      .forRoutes('api/accidents/:id/');
  }
}
