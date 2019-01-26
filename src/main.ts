import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('SGS Backend API')
    .setDescription('API for the SGS (Sistema de Gestão de Sinistros) platform')
    .setVersion('1.0')
    .addTag('accidents', 'Accident management')
    .addTag('vehicles', 'Vehicle management')
    .addTag('actors', 'Actor management')
    .addTag('auth', 'Authentication with JWT')
    .addTag('users', 'User management')
    .setSchemes('https', 'http')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  // Setup templates folder
  app.setBaseViewsDir(join(__dirname, '..', 'layouts'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
