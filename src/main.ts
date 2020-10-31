import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger set
  const options = new DocumentBuilder()
    .setTitle('Base Api')
    .setDescription('This is a test basic api made by Neojdpm')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/explorer', app, document);

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('application.port');
  await app.listen(port);
}
bootstrap();
