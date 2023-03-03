import { v4 as uuid } from 'uuid';
import { Cart } from './Cart';
import { DataValidator } from './DataValidator';
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

export type ProductToCartData = {
  productId: string;
  amount: number;
};

export class ShopSystem {
  private static instance: ShopSystem;
  products: ProductStock[] = shopProductDb;
  finalizedOrderList = new Map<string, SingleFinalizedOrder>();
  carts: Cart[] = [];
  categories: string[] = shopCategoryDb;
  usedDiscountCodes: string[] = [];
  availableDiscountCodes: Discounts[] = discountsCodes;

  private constructor(public readonly id = uuid()) {}

  static getInstance(): ShopSystem {
    if (!ShopSystem.instance) {
      ShopSystem.instance = new ShopSystem();
    }

    return ShopSystem.instance;
  }

  showProducts(): ProductStock[] {
    return this.products;
  }

  addProduct(newProduct: ProductStock): void {
    DataValidator.checkIfNotEqualOrBelowZero(newProduct.quantity, 'quantity');
    this.products.push(newProduct);
  }

  removeProduct(id: string): void {
    this.findProduct(id);
    this.products = this.products.filter((item) => item.product.id !== id);
  }

  setProductDiscount(id: string, discount: Discounts): void {
    const item = this.findProduct(id);

    if (this.checkDiscountCode(discount)) {
      item.product.setDiscount(discount);
    }
  }

  setProductName(id: string, newName: string): void {
    const item = this.findProduct(id);
    item.product.setName(newName);
  }

  setProductPrice(id: string, newPrice: number): void {
    const item = this.findProduct(id);
    item.product.setPrice(newPrice);
  }

  setProductCategory(id: string, newCategory: string): void {
    const item = this.findProduct(id);
    this.checkIfCategoryExist(newCategory);

    item.product.setCategory(newCategory);
  }

  showCategories(): string[] {
    return this.categories;
  }

  addCategory(newCategory: string): void {
    DataValidator.checkIfNotEmptyString(newCategory, 'category');
    this.categories.push(newCategory);
  }

  removeCategory(name: string): void {
    this.checkIfCategoryExist(name);

    this.categories = this.categories.filter(
      (category) => !category.includes(name)
    );
  }

  finalizeOrder(cartId: string): void {
    const cart = this.findCart(cartId);

    if (!this.checkDiscountCode(cart.discount)) {
      cart.setDiscount(Discounts.NO_DISCOUNT);
    }

    this.addToOrderHistory(cart);

    if (cart.discount !== Discounts.NO_DISCOUNT) {
      this.addUsedCodeToHistory(cart.discount);
    }

    this.removeCart(cart.id);
  }

  addToOrderHistory(cart: Cart): void {
    this.finalizedOrderList.set(cart.id, { cart, date: currentDate() });
  }

  showFinalizedOrders(): Map<string, SingleFinalizedOrder> {
    return this.finalizedOrderList;
  }

  showUsedDiscountCodes(): string[] {
    return this.usedDiscountCodes;
  }

  showAvailableDiscountCodes(): string[] {
    return Object.keys(this.availableDiscountCodes);
  }

  addCart(): string {
    const newCart = new Cart();
    this.carts.push(newCart);

    return newCart.id;
  }

  addProductToCart(cartId: string, productToCart: ProductToCartData): void {
    const cart = this.findCart(cartId);
    const productStock = this.findProduct(productToCart.productId);

    this.checkIfNotGraterThanStock(productToCart.amount, productStock.quantity);

    cart.addProduct({
      product: productStock.product,
      amount: productToCart.amount,
    });

    this.decreaseProductQuantity(productStock, productToCart.amount);
  }

  setCartDiscount(cartId: string, discount: Discounts): void {
    const cart = this.findCart(cartId);

    if (this.checkDiscountCode(discount)) {
      cart.setDiscount(discount);
    }
  }

  removeProductFromCart(cartId: string, productId: string): void {
    const cart = this.findCart(cartId);
    const itemAmountInCart = cart.findProductAmount(productId);
    const productToRestock = this.findProduct(productId);

    this.increaseProductQuantity(productToRestock, itemAmountInCart);
    cart.removeProduct(productId);
  }

  removeAllProductsFromCart(cartId: string): void {
    const cart = this.findCart(cartId);

    this.restockProductInCartQuantity(cart);
    cart.removeAllProducts();
  }

  private removeCart(id: string): void {
    this.carts = this.carts.filter((cart) => cart.id !== id);
  }

  private restockProductInCartQuantity(cart: Cart): void {
    cart.productList.forEach((cartItem) => {
      const productToRestock = this.findProduct(cartItem.product.id);
      this.increaseProductQuantity(productToRestock, cartItem.amount);
    });
  }

  private increaseProductQuantity(
    product: ProductStock,
    increaseQuantity: number
  ): void {
    product.quantity += increaseQuantity;
  }

  private decreaseProductQuantity(
    product: ProductStock,
    decreaseQuantity: number
  ): void {
    product.quantity -= decreaseQuantity;
  }

  private findProduct(id: string): ProductStock {
    const product = this.products.find((item) => item.product.id === id);

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  private checkIfCategoryExist(categoryName: string): boolean {
    const categoryExist = this.categories.some(
      (category) => category === categoryName
    );

    if (!categoryExist) {
      throw new Error('Categories not found');
    }

    return true;
  }

  private checkDiscountCode(discount: number): boolean {
    return this.availableDiscountCodes.some((code) => code === discount);
  }

  private addUsedCodeToHistory(discount: number): void {
    this.usedDiscountCodes.push(Discounts[discount]);

    const discountIndex = this.availableDiscountCodes.indexOf(discount);

    this.availableDiscountCodes = this.availableDiscountCodes.filter(
      (discount, index) => index !== discountIndex
    );
  }

  findCart(id: string): Cart {
    const cart = this.carts.find((cart) => cart.id === id);

    if (!cart) {
      throw new Error('Cart not found');
    }

    return cart;
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
