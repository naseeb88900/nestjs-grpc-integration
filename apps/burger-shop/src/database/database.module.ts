import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BurgerShop, BurgerShopSchema } from 'schema/burger-shop.schema';
import { Order, OrderSchema } from 'schema/order.schema';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
  ],
})
export class DatabaseModule { }