import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('SGS Backend API')
    .setDescription('API for the SGS (Sistema de Gestão de Sinistros) platform')
    .setVersion('1.0')
    .addTag('users', 'User management')
    .addTag('auth', 'Authentication with JWT')
    .addTag('vehicles', 'Vehicle management')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
