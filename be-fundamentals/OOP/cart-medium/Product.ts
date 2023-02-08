import { v4 as uuid } from 'uuid';
import { Discounts } from './types';

export interface ProductInformation {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
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
  quantity: number;
};

export class Product implements ProductInformation {
  readonly id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  discount: Discounts = Discounts.NO_DISCOUNT;

  constructor({ name, price, category, quantity }: SingleProduct) {
    this.validateNewProduct({ name, price, category, quantity });

    this.id = uuid();
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
  }

  finalPrice(): number {
    return this.price - this.price * this.discount;
  }

  setDiscount(discount: Discounts): void {
    this.discount = discount;
  }

  setName(newName: string): void {
    this.checkIfNotEmptyString(newName, 'name');
    this.name = newName;
  }

  setPrice(newPrice: number): void {
    this.checkIfNotBelowZero(newPrice, 'price');
    this.price = newPrice;
  }

  setCategory(newCategory: string): void {
    this.checkIfNotEmptyString(newCategory, 'category');
    this.category = newCategory;
  }

  setQuantity(newQuantity: number): void {
    this.checkIfNotBelowZero(newQuantity, 'quantity');
    this.quantity = newQuantity;
  }

  private validateNewProduct(data: SingleProduct): void {
    this.checkIfNotBelowZero(data.price, 'price');
    this.checkIfNotBelowZero(data.quantity, 'quantity');

    this.checkIfNotEmptyString(data.name, 'name');
    this.checkIfNotEmptyString(data.category, 'category');
  }

  private checkIfNotBelowZero(amount: number, nameOfValue: string): void {
    if (amount <= 0) {
      throw new Error(`Cannot add item with ${nameOfValue} less than zero`);
    }
  }

  private checkIfNotEmptyString(name: string, nameOfValue: string): void {
    const nameTrim = name.trim();

    if (nameTrim.length === 0) {
      throw new Error(`Cannot add item with empty ${nameOfValue}`);
    }
  }
}
