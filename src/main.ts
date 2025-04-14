import { ReflectionService } from '@grpc/reflection';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, 'proto/hero.proto'),
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  await app.startAllMicroservices();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(configService.get('PORT') ?? 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
