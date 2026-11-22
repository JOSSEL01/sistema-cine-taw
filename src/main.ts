import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión de Cine (TAW-251)')
    .setDescription(
      'API REST para gestión de cine con NestJS, TypeORM y PostgreSQL',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      content: document,
    }),
  );

  const port = Number(process.env.PORT || 3000);
  await app.listen(port);
  console.log(`Servidor corriendo en: http://localhost:${port}`);
  console.log(`Documentación Scalar en: http://localhost:${port}/docs`);
}

bootstrap();