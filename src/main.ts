import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  // origin: ["http://localhost:3000", "http://localhost:8080", "http://localhost:4200"]
  // });
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 30000000 //session time in ms
      }
    }),
  );
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
