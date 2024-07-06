import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { json } from 'body-parser';
import { ErrorInterceptor } from './common/interceptors';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: false,
    origin: process.env.FRONTEND_URL,
    exposedHeaders: ['filename'],
    allowedHeaders: [
      'x-requested-with',
      'content-type',
      'authorization',
      'modulos',
      'usuario-extra',
    ],
  });

  app.use(cookieParser());
  app.use(json({ limit: '20mb' }));

  app.disable('x-powered-by');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  app.useGlobalInterceptors(new ErrorInterceptor());
  app.setGlobalPrefix(process.env.CONTEXT || '');

  // if (process.env.MODE_ENV === 'dev') {
  //   /*Swagger editor*/
  //   const config = new DocumentBuilder()
  //     .setTitle('San Market')
  //     .setDescription('Documentación de API San Market')
  //     .setVersion(VERSION_ACTUAL)
  //     .build();
  //   const options: SwaggerDocumentOptions = {
  //     ignoreGlobalPrefix: false,
  //   };
  //   const document = SwaggerModule.createDocument(app, config, options);
  //   SwaggerModule.setup('api', app, document);
  // }

  const port = process.env.PORT || 6926;

  await app.listen(port);
  const logger = new Logger('API-GATEWAY');
  logger.log(`==== API-GATEWAY TIENDA PRÁCTICAS CORRIENDO =====`);
}
bootstrap();
