import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './filters/http-exception.filter';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { AccountController } from './controllers/account.controller';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    errorHttpStatusCode: 422,
  }));

  // Global error handling
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Timeout interceptor
  app.useGlobalInterceptors(new TimeoutInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Accounts API')
    .setDescription('API documentation for the Account Service')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      'access-token',
    )
    .build();

  // ~Swagger setup
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // console.log('Available routes:', app.getHttpServer()._events.request._router.stack .filter(layer => layer.route) .map(layer => ({ path: layer.route?.path, method: layer.route?.stack[0].method })));
  await app.listen(3000);
}
bootstrap();