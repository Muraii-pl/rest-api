/** @format */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import './common/extensions/date.extension';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');

  const swaggerConfig = new DocumentBuilder()
    .setBasePath('api')
    .setTitle('AntGym')
    .setDescription('AntGym Api Description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      in: 'header',
      description: 'Enter JWT Token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // app.use(helmet());
  app.disable('x-powered-by');
  app.disable('X-Powered-By');
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts({
    maxAge: 1555200,
    includeSubDomains: false,
  }));

  app.enableCors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      "Content-Type",
      "X-CSRF-TOKEN",
      "access-control-allow-methods",
      "Access-Control-Allow-Origin",
      "access-control-allow-credentials",
      "access-control-allow-headers",
      "Authorization"
    ],
    credentials: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );


  await app.listen(3000);
  console.log('Server start at: http://localhost:3000/api');

}

bootstrap();
