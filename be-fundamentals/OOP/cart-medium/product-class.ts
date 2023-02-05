import { v4 as uuid } from 'uuid';
import { ProductInformation, SingleProduct } from './types';

export class Product implements ProductInformation {
  id: string;
  name: string;
  category: string;
  price: number;
  discount: number = 0;

  constructor(product: SingleProduct) {
    this.id = uuid();
    Object.assign(this, product);
  }

  finalPrice(): number {
    return this.price - this.price * this.discount;
  }

  setDiscount(discount: number) {
    this.discount = discount;
  }

  changeName(newName: string): void {
    this.name = newName;
  }

  changePrice(newPrice: number): void {
    this.price = newPrice;
  }

  changeCategory(newCategory: string): void {
    this.category = newCategory;
  }
}
