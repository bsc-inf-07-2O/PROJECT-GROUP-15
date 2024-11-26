import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
 

  // Increase the size limit for JSON and URL-encoded bodies
  app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Adjust the limit as needed

  await app.listen(3001);
}
bootstrap();
