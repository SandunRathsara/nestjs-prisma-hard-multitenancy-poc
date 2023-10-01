import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CONFIGS } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('ROOT');

  const config = new DocumentBuilder()
    .setTitle('Multi tenant Claims')
    .setDescription('Multi tenant Claims')
    .setVersion('1.0')
    .addTag('claims')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get(CONFIGS.PORT), () =>
    logger.log(
      `MLTNT POC Server started. View swagger http://localhost:${configService.get<number>(
        CONFIGS.PORT,
      )}/swagger`,
    ),
  );
}
bootstrap();
