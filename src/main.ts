import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/interceptors/http-exception.filter';

const port = process.env.PORT || 3001;
const logger = new Logger('APP');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle(`${process.env.APP_NAME} By ${process.env.COMPANY_NAME}`)
    .setDescription(`${process.env.APP_DESCRIPTION}`)
    .setVersion(`${process.env.APP_VERSION}`)
    .build();
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(port, () => {
    logger.log(`⛱ server running on port ${port}`);
  });
}
bootstrap();
