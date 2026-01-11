import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log('🚀 CMS API running on http://localhost:3000/api');
}
bootstrap();

