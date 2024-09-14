import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ClientsModule.register([{
    name: "burger_shop",
    transport: Transport.GRPC,
    options: {
      protoPath: join(__dirname, '../burger-shop.proto'),
      package: "burger_shop"
    } 
  }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
