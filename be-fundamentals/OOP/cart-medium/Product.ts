import { v4 as uuid } from 'uuid';
import { DataValidator } from './DataValidator';
import { Discounts } from './types';

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
    DataValidator.checkIfDiscountLessThanValue(discount);
    this.discount = discount;
  }

  setName(newName: string): void {
    DataValidator.checkIfNotEmptyString(newName, 'name');
    this.name = newName;
  }

  setPrice(newPrice: number): void {
    DataValidator.checkIfNotEqualOrBelowZero(newPrice, 'price');
    this.price = newPrice;
  }

  setCategory(newCategory: string): void {
    DataValidator.checkIfNotEmptyString(newCategory, 'category');
    this.category = newCategory;
  }

  private validateNewProduct(data: SingleProduct): void {
    DataValidator.checkIfNotEqualOrBelowZero(data.price, 'price');
    DataValidator.checkIfNotEmptyString(data.name, 'name');
    DataValidator.checkIfNotEmptyString(data.category, 'category');
  }
}
