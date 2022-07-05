import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import * as dotenv from 'dotenv';
import { UnauthorizedExceptionFilter } from './filters/unauthorized.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new EntityNotFoundExceptionFilter(), new UnauthorizedExceptionFilter());
  await app.listen(5050);
}
bootstrap();
