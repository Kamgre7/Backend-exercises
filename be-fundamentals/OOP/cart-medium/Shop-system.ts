import { v4 as uuid } from 'uuid';
import { Basket } from './Basket';
import { Product } from './Product';
import { shopCategoryDb, shopProductDb } from './productExampleDB';
import { Discounts } from './types';
import { currentDate } from './utils';

interface SingleFinalizedOrder {
  cart: Basket;
  date: string;
}

type OrderHistory = [string, SingleFinalizedOrder][];

export class ShopSystem {
  readonly id: string = uuid();
  private static instance: ShopSystem;
  private static products: Product[] = shopProductDb;
  private static finalizedOrderList = new Map<string, SingleFinalizedOrder>();
  private static categories: string[] = shopCategoryDb;
  private static usedDiscountCodes: string[] = [];

  private constructor() {}

  static getInstance(): ShopSystem {
    if (!ShopSystem.instance) {
      ShopSystem.instance = new ShopSystem();
    }

    return ShopSystem.instance;
  }

  static finalizeOrder(cart: Basket): void {
    ShopSystem.restockProductQuantity(cart);

    ShopSystem.finalizedOrderList.set(cart.id, { cart, date: currentDate() });

    ShopSystem.addUsedCode(cart.discount);
  }

  static showProducts(): Product[] {
    return ShopSystem.products;
  }

  static addProduct(newProduct: Product): void {
    this.products.push(newProduct);
  }

  static removeProduct(id: string): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  static showCategories(): string[] {
    return ShopSystem.categories;
  }

  static addCategory(newCategory: string): void {
    this.categories.push(newCategory);
  }

  static removeCategory(name: string): void {
    this.categories = this.categories.filter(
      (category) => !category.includes(name)
    );
  }

  static showFinalizedOrders(): OrderHistory {
    return [...this.finalizedOrderList];
  }

  static showUsedDiscountCodes() {
    return this.usedDiscountCodes;
  }

  private static addUsedCode(discount: number) {
    ShopSystem.usedDiscountCodes.push(Discounts[discount]);
  }

  private static restockProductQuantity(cart: Basket): void {
    cart.productList.forEach((cartItem) => {
      const index = ShopSystem.products.findIndex(
        (product) => cartItem.product.id === product.id
      );

      ShopSystem.products[index].restockQuantity(cartItem.amount);
    });
  }
}
