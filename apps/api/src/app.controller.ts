import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BurgerShop, BurgerShops, Empty, Orders, PostBurgerDTO } from 'proto/burger-shop';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('burger-shop')
  createBurgerShop(@Body() burgerShop: BurgerShop) {
    return this.appService.createBurgerShop(burgerShop);
  }

  @Post('order')
  postOrder(@Body() postBurgerDTO: PostBurgerDTO) {
    return this.appService.postOrder(postBurgerDTO);
  }

  @Get('burger-shops')
  getBurgerShops(request: Empty) {
    return this.appService.getBurgerShops(request);
  }

  @Get('orders')
  getOrders(request: Empty) {
    return this.appService.getOrders(request);
  }
}