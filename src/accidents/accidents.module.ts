import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccidentsController } from './controllers/accidents.controller';
import { ActorsController } from './controllers/actors.controller';
import { VehiclesController } from './controllers/vehicles.controller';
import { Accident } from './entities/accident.entity';
import { AccidentsService } from './services/accidents.service';
import { AccidentExistsMiddleware } from './middlewares/accident-exists.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Accident])],
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
