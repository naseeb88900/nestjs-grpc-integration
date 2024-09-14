import { Test, TestingModule } from '@nestjs/testing';
import { BurgerShopController } from './burger-shop.controller';
import { BurgerShopService } from './burger-shop.service';

describe('BurgerShopController', () => {
  let burgerShopController: BurgerShopController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BurgerShopController],
      providers: [BurgerShopService],
    }).compile();

    burgerShopController = app.get<BurgerShopController>(BurgerShopController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(burgerShopController.getHello()).toBe('Hello World!');
    });
  });
});
