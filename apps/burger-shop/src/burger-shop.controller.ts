import { Controller, Get } from '@nestjs/common';
import { BurgerShopService } from './burger-shop.service';
import { GrpcMethod } from '@nestjs/microservices';
import { BurgerShop, BurgerShops, BurgerShopServiceController, Empty, PostBurgerDTO, Orders } from 'proto/burger-shop';
import { Observable } from 'rxjs';

@Controller()
export class BurgerShopController implements BurgerShopServiceController {
  constructor(private readonly burgerShopService: BurgerShopService) { }

  @Get()
  getHello(): Promise<string>{
    return this.burgerShopService.getHello();
  }

  @GrpcMethod("BurgerShopService", 'CreateBurgerShop')
  async createBurgerShop(burgerShop: BurgerShop): Promise<BurgerShop> { // Change return type to Promise<BurgerShop>
    return this.burgerShopService.createBurgerShop(burgerShop);
  }

  @GrpcMethod("BurgerShopService", 'PostOrder')
  postOrder(postBurgerDTO: PostBurgerDTO): Promise<BurgerShop> {
    return this.burgerShopService.postOrder(postBurgerDTO);
  }

  @GrpcMethod("BurgerShopService", 'GetBurgerShops')
  getBurgerShops(request: Empty): Promise<BurgerShops> { 
    return this.burgerShopService.getBurgerShops();
  }

  @GrpcMethod("BurgerShopService", 'GetOrders')
  getOrders(request: Empty): Promise<Orders> {
    return this.burgerShopService.getOrders();
  }
}