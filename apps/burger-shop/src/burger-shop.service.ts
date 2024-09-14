import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BurgerShop, BurgerShops, PostBurgerDTO, Orders, Order } from 'proto/burger-shop';
import { BurgerShopDocument, BurgerShop as BurgerShopModel } from 'schema/burger-shop.schema'; // Import your Mongoose model
import { OrderDocument, Order as OrderModel } from 'schema/order.schema'; // Import your Mongoose model

@Injectable()
export class BurgerShopService {
  constructor(
    @InjectModel(BurgerShopModel.name) private burgerShopModel: Model<BurgerShopDocument>,
    @InjectModel(OrderModel.name) private orderModel: Model<OrderDocument>
  ) {}

  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async createBurgerShop(burgerShop: BurgerShop): Promise<BurgerShop> {
    const createdShop = new this.burgerShopModel(burgerShop);
    const savedShop = await createdShop.save();

    return {
      id: savedShop._id.toString(),
      name: savedShop.name,
      location: savedShop.location,
    };
  }


  async postOrder(postBurgerDTO: PostBurgerDTO): Promise<BurgerShop | null> {
    const order: Order = {
      id: (await this.orderModel.countDocuments() + 1).toString(),
      burgerName: postBurgerDTO.burgerName,
      quantity: postBurgerDTO.quantity,
      customerName: postBurgerDTO.customerName
    };
    await this.orderModel.create(order);

    const burgerShop = await this.burgerShopModel.findById(order.id).exec();

    if (burgerShop) {
      return {
        id: burgerShop._id.toString(),
        name: burgerShop.name,
        location: burgerShop.location,
      };
    }
    return null;
  }

  async getBurgerShops(): Promise<BurgerShops> {
    const shops = await this.burgerShopModel.find().exec();

    const mappedShops: BurgerShop[] = shops.map(shop => ({
      id: shop._id.toString(),
      name: shop.name,
      location: shop.location,
    }));

    return { shops: mappedShops };
  }

  async getOrders(): Promise<Orders> {
    const orders = await this.orderModel.find().exec();

    const mappedOrders: Order[] = orders.map(order => ({
      id: order._id.toString(),
      burgerName: order.burgerName,
      quantity: order.quantity,
      customerName: order.customerName,
    }));

    return { orders: mappedOrders };
  }
}
