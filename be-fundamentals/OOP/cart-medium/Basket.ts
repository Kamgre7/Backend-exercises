import { v4 as uuid } from 'uuid';
import { Product } from './product-class';
import { Discounts } from './types';

export interface BasketInformation {
  id: string;
  productList: BasketProduct[];
  discount: number;
  addProduct(item: BasketProduct): void;
  removeProduct(id: string): void;
  removeAllProducts(): void;
  sumBasketPrice(): number;
}

export type BasketProduct = {
  product: Product;
  quantity: number;
};

export class Basket implements BasketInformation {
  id: string;
  productList: BasketProduct[] = [];
  discount: Discounts = Discounts.NO_DISCOUNT;

  constructor() {
    this.id = uuid();
  }

  addProduct(item: BasketProduct): void {
    this.productList.push(item);
  }

  sumBasketPrice(): number {
    const sumProductPrice = this.productList.reduce(
      (prev, curr) => prev + curr.product.finalPrice(),
      0
    );

    return sumProductPrice - sumProductPrice * this.discount;
  }

  setDiscount(discount: Discounts) {
    this.discount = discount;
  }

  removeProduct(id: string): void {
    this.productList = this.productList.filter(
      (item) => item.product.id !== id
    );
  }

  removeAllProducts(): void {
    this.productList.length = 0;
  }
}
