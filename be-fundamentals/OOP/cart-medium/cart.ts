import { v4 as uuid } from 'uuid';
import { Product } from './Product';
import { Discounts } from './types';

export interface ICart {
  id: string;
  productList: CartProduct[];
  discount: number;
  addProduct(item: CartProduct, productInStockQuantity: number): void;
  sumCart(): number;
  setDiscount(discount: Discounts): void;
  removeProduct(id: string): void;
  removeAllProducts(): void;
}

export type CartProduct = {
  product: Product;
  amount: number;
};

export class Cart implements ICart {
  productList: CartProduct[] = [];
  discount: Discounts = Discounts.NO_DISCOUNT;

  constructor(public readonly id = uuid()) {}

  sumCart(): number {
    const cartValue = this.productList.reduce(
      (prev, curr) => prev + curr.product.finalPrice() * curr.amount,
      0
    );

    return cartValue - cartValue * this.discount;
  }

  addProduct(item: CartProduct, productInStockQuantity: number): void {
    this.checkIfNotEqualBelowZero(item.amount);

    const duplicatedProduct = this.findDuplicatedProduct(item);

    duplicatedProduct === null
      ? this.productList.push(item)
      : this.increaseProductCartAmount(
          item,
          duplicatedProduct,
          productInStockQuantity
        );
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

  findDuplicatedProduct(item: CartProduct): CartProduct | null {
    const productInCart = this.productList.find(
      (cartItem) => cartItem.product.id === item.product.id
    );

    return productInCart ? productInCart : null;
  }

  private increaseProductCartAmount(
    item: CartProduct,
    productInCart: CartProduct,
    productInStockQuantity: number
  ): void {
    const sumAmountOfProduct = item.amount + productInCart.amount;

    this.checkIfNotGraterThanStock(sumAmountOfProduct, productInStockQuantity);

    productInCart.amount = sumAmountOfProduct;
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

  private checkIfNotEqualBelowZero(quantity: number): void {
    if (quantity <= 0) {
      throw new Error(`Cannot add item with quantity less than zero`);
    }
  }
}
