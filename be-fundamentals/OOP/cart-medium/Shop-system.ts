import { v4 as uuid } from 'uuid';

export class ShopSystem {
  private static instance: ShopSystem;
  private id: string = uuid();

  private constructor() {}

  static getInstance(): ShopSystem {
    if (!ShopSystem.instance) {
      ShopSystem.instance = new ShopSystem();
    }

    return ShopSystem.instance;
  }
}
