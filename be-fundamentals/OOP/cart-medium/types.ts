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
  removeProduct(): void;
  removeAllProduct(): void;
}
