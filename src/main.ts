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
  // Add this to see all registered routes 
  const server = app.getHttpServer(); 
  const router = server._events.request._router; 
  
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
    .addTag('Accounts')
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

  const accountController = app.get(AccountController);
  await app.listen(3000);
}
bootstrap();