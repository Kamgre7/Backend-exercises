import { v4 as uuid } from 'uuid';
import { DataValidator } from './DataValidator';
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

  addProduct(item: CartProduct): void {
    DataValidator.checkIfNotEqualOrBelowZero(item.amount, 'amount');

    const duplicatedProduct = this.findDuplicatedProduct(item);

    duplicatedProduct === null
      ? this.productList.push(item)
      : this.increaseProductCartAmount(duplicatedProduct, item.amount);
  }

  setDiscount(discount: Discounts) {
    DataValidator.checkIfDiscountLessThanValue(discount);
    this.discount = discount;
  }

  removeProduct(productId: string): void {
    this.checkIfProductInCart(productId);

    this.productList = this.productList.filter(
      (item) => item.product.id !== productId
    );
  }

  removeAllProducts(): void {
    this.productList.length = 0;
  }

  findProductAmount(productId: string): number {
    const product = this.productList.find(
      (item) => item.product.id === productId
    );

    return product.amount;
  }

  private checkIfProductInCart(productId: string): void {
    const isProductInCart = this.productList.some(
      (item) => item.product.id === productId
    );

    if (!isProductInCart) {
      throw new Error('Cannot find a product in cart');
    }
  }

  private findDuplicatedProduct(item: CartProduct): CartProduct | null {
    const productInCart = this.productList.find(
      (cartItem) => cartItem.product.id === item.product.id
    );

    return productInCart ? productInCart : null;
  }

  private increaseProductCartAmount(
    productInCart: CartProduct,
    amountIncrease: number
  ): void {
    productInCart.amount += amountIncrease;
  }
}
