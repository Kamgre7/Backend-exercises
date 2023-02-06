import { v4 as uuid } from 'uuid';
import { Product } from './product-class';
import { BasketInformation, Discounts } from './types';

export class Basket implements BasketInformation {
  id: string;
  productList: Product[] = [];
  discount: Discounts = Discounts.NO_DISCOUNT;

  constructor() {
    this.id = uuid();
  }

  addProduct(item: Product): void {
    this.productList.push(item);
  }

  removeProduct(id: string): void {
    this.productList = this.productList.filter((product) => product.id !== id);
  }

  removeAllProduct(): void {
    this.productList.length = 0;
  }

  sumBasketPrice(): number {
    const sumProductPrice = this.productList.reduce(
      (prev, curr) => prev + curr.finalPrice(),
      0
    );

    return sumProductPrice - sumProductPrice * this.discount;
  }

  setDiscount(discount: Discounts) {
    this.discount = discount;
  }
}
