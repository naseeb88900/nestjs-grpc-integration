import { Module } from '@nestjs/common';
import { BurgerShopController } from './burger-shop.controller';
import { BurgerShopService } from './burger-shop.service';
import { DatabaseModule } from 'database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BurgerShop, BurgerShopSchema } from 'schema/burger-shop.schema';
import { Order, OrderSchema } from 'schema/order.schema';

@Module({
  imports: [DatabaseModule, 
    MongooseModule.forFeature([
      { name: BurgerShop.name, schema: BurgerShopSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [BurgerShopController],
  providers: [BurgerShopService],
})
export class BurgerShopModule {}
