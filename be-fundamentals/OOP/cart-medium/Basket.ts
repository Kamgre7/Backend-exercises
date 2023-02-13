import { v4 as uuid } from 'uuid';
import { Product } from './Product';
import { Discounts } from './types';

export interface BasketInformation {
  id: string;
  productList: BasketProduct[];
  discount: number;
  addProduct(item: BasketProduct): void;
  sumBasket(): number;
  setDiscount(discount: Discounts): void;
  removeProduct(id: string): void;
  removeAllProducts(): void;
}

export type BasketProduct = {
  product: Product;
  amount: number;
};

export class Basket implements BasketInformation {
  readonly id: string;
  productList: BasketProduct[] = [];
  discount: Discounts = Discounts.NO_DISCOUNT;

  constructor() {
    this.id = uuid();
  }

  sumBasket(): number {
    const basketValue = this.productList.reduce(
      (prev, curr) => prev + curr.product.finalPrice() * curr.amount,
      0
    );

    return basketValue - basketValue * this.discount;
  }

  addProduct(item: BasketProduct): void {
    this.checkIfNotQuantityBelowZero(item.amount);
    this.checkIfNotGraterThanStock(item.amount, item.product.quantity);

    const duplicatedProductIndex = this.findDuplicatedProduct(item);

    !!duplicatedProductIndex
      ? this.productList.push(item)
      : this.increaseProductInBasketAmount(item, duplicatedProductIndex);
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

  private findDuplicatedProduct(item: BasketProduct): number {
    return this.productList.findIndex(
      (basketItem) => basketItem.product.id === item.product.id
    );
  }

  private increaseProductInBasketAmount(
    item: BasketProduct,
    index: number
  ): void {
    const sumAmountOfProduct = item.amount + this.productList[index].amount;

    this.checkIfNotGraterThanStock(sumAmountOfProduct, item.product.quantity);

    this.productList[index] = {
      ...this.productList[index],
      amount: sumAmountOfProduct,
    };
  }

  private checkIfNotQuantityBelowZero(quantity: number): void {
    if (quantity <= 0) {
      throw new Error(`Cannot add item with quantity less than zero`);
    }
  }

  private checkIfNotGraterThanStock(
    quantity: number,
    productInStock: number
  ): void {
    if (quantity > productInStock) {
      throw new Error(
        `Cannot add item with quantity grater than product stock`
      );
    }
  }
}
