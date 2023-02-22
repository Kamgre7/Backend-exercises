import { v4 as uuid } from 'uuid';
import { Cart, CartProduct } from './Cart';
import { Product } from './Product';
import { discountsCodes, shopCategoryDb, shopProductDb } from './ShopSystemDB';
import { Discounts } from './types';
import { currentDate } from './utils';

type SingleFinalizedOrder = {
  cart: Cart;
  date: string;
};

export type ProductStock = {
  product: Product;
  quantity: number;
};

type OrderHistory = [string, SingleFinalizedOrder][];

export class ShopSystem {
  private static instance: ShopSystem;
  private static products: ProductStock[] = shopProductDb;
  private static finalizedOrderList = new Map<string, SingleFinalizedOrder>();
  private static carts: Cart[] = [];
  private static categories: string[] = shopCategoryDb;
  private static usedDiscountCodes: string[] = [];
  private static availableDiscountCodes: Discounts[] = discountsCodes;

  private constructor(public readonly id = uuid()) {}

  static getInstance(): ShopSystem {
    if (!ShopSystem.instance) {
      ShopSystem.instance = new ShopSystem();
    }

    return ShopSystem.instance;
  }

  showProducts(): ProductStock[] {
    return ShopSystem.products;
  }

  addProduct(newProduct: ProductStock): void {
    this.checkIfNotEqualBelowZero(newProduct.quantity);

    ShopSystem.products.push(newProduct);
  }

  removeProduct(id: string): void {
    ShopSystem.products = ShopSystem.products.filter(
      (item) => item.product.id !== id
    );
  }

  setProductDiscount(id: string, discount: Discounts): void | string {
    const item = this.findProduct(id);

    if (!item) {
      return 'No product found!';
    }

    item.product.setDiscount(discount);
  }

  setProductName(id: string, newName: string) {
    const item = this.findProduct(id);

    if (!item) {
      return 'No product found!';
    }

    item.product.setName(newName);
  }

  setProductPrice(id: string, newPrice: number) {
    const item = this.findProduct(id);

    if (!item) {
      return 'No product found!';
    }

    item.product.setPrice(newPrice);
  }

  setProductCategory(id: string, newCategory: string) {
    const item = this.findProduct(id);

    if (!item) {
      return 'No product found!';
    }

    if (!this.findCategory(newCategory)) {
      return 'No category found!';
    }

    item.product.setCategory(newCategory);
  }

  showCategories(): string[] {
    return ShopSystem.categories;
  }

  addCategory(newCategory: string): void {
    this.checkIfNotEmptyString(newCategory);

    ShopSystem.categories.push(newCategory);
  }

  removeCategory(name: string): void {
    ShopSystem.categories = ShopSystem.categories.filter(
      (category) => !category.includes(name)
    );
  }

  finalizeOrder(cartId: string): void | string {
    const cart = this.findCart(cartId);

    if (!cart) {
      return 'Cart not found';
    }

    if (!this.checkDiscountCode(cart.discount)) {
      cart.setDiscount(Discounts.NO_DISCOUNT);
    }

    this.restockProductQuantity(cart);
    this.addToOrderHistory(cart);
    this.addUsedCodeToHistory(cart.discount);
    this.removeCart(cart.id);
  }

  addToOrderHistory(cart: Cart): void {
    ShopSystem.finalizedOrderList.set(cart.id, { cart, date: currentDate() });
  }

  showFinalizedOrders(): OrderHistory {
    return [...ShopSystem.finalizedOrderList];
  }

  showUsedDiscountCodes(): string[] {
    return ShopSystem.usedDiscountCodes;
  }

  showAvailableDiscountCodes(): string[] {
    return Object.keys(ShopSystem.availableDiscountCodes);
  }

  addCart(cart: Cart): void {
    ShopSystem.carts.push(cart);
  }

  addProductToCart(cartId: string, product: CartProduct): void | string {
    const cart = this.findCart(cartId);
    const productInStock = this.findProduct(product.product.id);

    if (!cart) {
      return 'Cart not found';
    }

    if (!productInStock) {
      return 'Product not found';
    }

    this.checkIfNotEqualBelowZero(product.amount);
    this.checkIfNotGraterThanStock(product.amount, productInStock.quantity);

    cart.addProduct(product, productInStock.quantity);
  }

  private findProduct(id: string): ProductStock | null {
    const product = ShopSystem.products.find((item) => item.product.id === id);
    return product ? product : null;
  }

  private findCategory(categoryName: string): boolean {
    return ShopSystem.categories.some((category) => category === categoryName);
  }

  private checkDiscountCode(discount: number): boolean {
    const availableCode = ShopSystem.availableDiscountCodes.find(
      (code) => code === discount
    );

    return availableCode ? true : false;
  }

  private addUsedCodeToHistory(discount: number) {
    ShopSystem.usedDiscountCodes.push(Discounts[discount]);

    const index = ShopSystem.availableDiscountCodes.indexOf(discount);
    ShopSystem.availableDiscountCodes.splice(index, 1);
  }

  private findCart(id: string): Cart | null {
    const cart = ShopSystem.carts.find((cart) => cart.id === id);
    return cart ? cart : null;
  }

  private removeCart(id: string): void {
    ShopSystem.carts = ShopSystem.carts.filter((cart) => cart.id !== id);
  }

  private restockProductQuantity(cart: Cart): void {
    cart.productList.forEach((cartItem) => {
      const productToRestock = this.findProduct(cartItem.product.id);

      productToRestock.quantity -= cartItem.amount;
    });
  }

  private checkIfNotEqualBelowZero(quantity: number): void {
    if (quantity <= 0) {
      throw new Error(`Cannot add item with quantity less than zero`);
    }
  }

  private checkIfNotEmptyString(name: string): void {
    const nameTrim = name.trim();

    if (nameTrim.length === 0) {
      throw new Error(`Cannot add empty category`);
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

const shopSystem = ShopSystem.getInstance();
shopSystem.showProducts();
