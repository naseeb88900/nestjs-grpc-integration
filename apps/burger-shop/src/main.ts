import { NestFactory } from '@nestjs/core';
import { BurgerShopModule } from './burger-shop.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(BurgerShopModule, {
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../burger-shop.proto'),
      package: process.env.PACKAGE_NAME
    }
  });
  await app.listen();
}
bootstrap();
