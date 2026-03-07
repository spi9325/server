import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://example.com', 'http://localhost:5173'], // allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you want cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();