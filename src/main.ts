import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger-config';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(
    AppModule.register({
      driver: 'orm',
    }),
  );
  setupSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
