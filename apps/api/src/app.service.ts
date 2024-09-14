import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BURGER_SHOP_SERVICE_NAME, BurgerShop, BurgerShops, BurgerShopServiceClient, Empty, Orders, PostBurgerDTO } from 'proto/burger-shop';

@Injectable()
export class AppService implements OnModuleInit {
  private burgerServiceClient: BurgerShopServiceClient
  constructor(@Inject('burger_shop') private clientGrpc: ClientGrpc) { }
  onModuleInit() {
    this.burgerServiceClient = this.clientGrpc.getService<BurgerShopServiceClient>(BURGER_SHOP_SERVICE_NAME)
  }

  getHello(): string {
    return 'Hello World!';
  }

  createBurgerShop(burgerShopDTO: BurgerShop) {
    return this.burgerServiceClient.createBurgerShop(burgerShopDTO);
  }

  postOrder(postBurgerDTO: PostBurgerDTO) {
    return this.burgerServiceClient.postOrder(postBurgerDTO);
  }

  getBurgerShops(request: Empty) {
    return this.burgerServiceClient.getBurgerShops(request);
  }

  getOrders(request: Empty) {
    return this.burgerServiceClient.getOrders(request);
  }

}
