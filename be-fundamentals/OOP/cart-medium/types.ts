import { Product } from './product-class';

export interface ProductInformation {
  id: string;
  name: string;
  category: string;
  price: number;
  discount?: number;
  finalPrice(): number;
  changeName(newName: string): void;
  changePrice(newPrice: number): void;
  changeCategory(newCategory: string): void;
}

export type SingleProduct = {
  name: string;
  category: string;
  price: number;
};

export interface BasketInformation {
  id: string;
  productList: Product[];
  discount: number;

  addProduct(item: Product): void;
  removeProduct(id: string): void;
  removeAllProduct(): void;
  sumBasketPrice(): number;
}

export enum Discounts {
  NO_DISCOUNT = 0,
  TEN_PERCENT_DISCOUNT = 0.1,
  TWENTY_PERCENT_DISCOUNT = 0.2,
  THIRTY_PERCENT_DISCOUNT = 0.3,
  FORTY_PERCENT_DISCOUNT = 0.4,
  FIFTY_PERCENT_DISCOUNT = 0.5,
}
