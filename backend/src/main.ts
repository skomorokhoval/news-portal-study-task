import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow cross-origin requests
  app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true,
  }));

  // Use cookie-parser middleware
  app.use(cookieParser());

  await app.listen(3000);
}

bootstrap();
