import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentsController } from './controllers/accidents.controller';
import { ActorsController } from './controllers/actors.controller';
import { VehiclesController } from './controllers/vehicles.controller';
import { Accident } from './entities/accident.entity';
import { AccidentsService } from './services/accidents.service';
import { AccidentExistsMiddleware } from './middlewares/accident-exists.middleware';
import { VehicleMeta } from './entities/vehicle-meta.entity';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accident, Vehicle, VehicleMeta])],
  controllers: [AccidentsController, ActorsController, VehiclesController],
  providers: [AccidentsService],
})
export class AccidentsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccidentExistsMiddleware)
      .with('id')
      .forRoutes('api/accidents/:id/');
  }
}
