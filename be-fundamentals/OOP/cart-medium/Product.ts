import { v4 as uuid } from 'uuid';
import { Discounts } from './types';
import { dataValidation } from './utils';

export interface IProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: number;
  finalPrice(): number;
  setName(newName: string): void;
  setPrice(newPrice: number): void;
  setCategory(newCategory: string): void;
}

export type SingleProduct = {
  name: string;
  category: string;
  price: number;
};

export class Product implements IProduct {
  public readonly id: string;
  name: string;
  category: string;
  price: number;
  discount: Discounts = Discounts.NO_DISCOUNT;

  constructor({ name, price, category }: SingleProduct) {
    this.validateNewProduct({ name, price, category });

    this.id = uuid();
    this.name = name;
    this.category = category;
    this.price = price;
  }

  finalPrice(): number {
    return this.price - this.price * this.discount;
  }

  setDiscount(discount: Discounts): void {
    this.discount = discount;
  }

  setName(newName: string): void {
    dataValidation.checkIfNotEmptyString(newName, 'name');
    this.name = newName;
  }

  setPrice(newPrice: number): void {
    dataValidation.checkIfNotEqualOrBelowZero(newPrice, 'price');
    this.price = newPrice;
  }

  setCategory(newCategory: string): void {
    dataValidation.checkIfNotEmptyString(newCategory, 'category');
    this.category = newCategory;
  }

  private validateNewProduct(data: SingleProduct): void {
    dataValidation.checkIfNotEqualOrBelowZero(data.price, 'price');
    dataValidation.checkIfNotEmptyString(data.name, 'name');
    dataValidation.checkIfNotEmptyString(data.category, 'category');
  }
}
