import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Everymind - Api Users')
  .setDescription('Api para cadastro e login de usuários para teste da Everymind')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('Auth')
  .addTag('Users')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('home', app, document);

  await app.listen(3000);
}
bootstrap();
