import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const port = process.env.NODE_PORT || 43000
  await app.listen(port)
}
bootstrap();
