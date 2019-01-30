import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Set up Swagger
  const options = new DocumentBuilder()
    .setTitle('SGS Backend API')
    .setDescription('API for the SGS (Sistema de Gestão de Sinistros) platform')
    .setVersion('1.0')
    .addTag('accidents', 'Accident management')
    .addTag('auth', 'Authentication with JWT')
    .addTag('users', 'User management')
    .setSchemes('https', 'http')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  // Setup static folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Setup templates folder
  app.setBaseViewsDir(join(__dirname, '..', 'layouts'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
