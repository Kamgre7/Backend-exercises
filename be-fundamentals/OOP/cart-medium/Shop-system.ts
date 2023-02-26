import { v4 as uuid } from 'uuid';
import { Cart, CartProduct } from './Cart';
import { Product } from './Product';
import { discountsCodes, shopCategoryDb, shopProductDb } from './ShopSystemDB';
import { Discounts } from './types';
import { currentDate, DataValidation } from './utils';

type SingleFinalizedOrder = {
  cart: Cart;
  date: string;
};

export type ProductStock = {
  product: Product;
  quantity: number;
};

type ProductToCartData = {
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
    DataValidation.checkIfNotEqualOrBelowZero(newProduct.quantity, 'quantity');
    this.products.push(newProduct);
  }

  removeProduct(id: string): void {
    this.products = this.products.filter((item) => item.product.id !== id);
  }

  setProductDiscount(id: string, discount: Discounts): void | string {
    const item = this.findProduct(id);

    if (!item) {
      return 'No product found!';
    }

    if (this.checkDiscountCode(discount)) {
      item.product.setDiscount(discount);
    }
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
    return this.categories;
  }

  addCategory(newCategory: string): void {
    DataValidation.checkIfNotEmptyString(newCategory, 'category');
    this.categories.push(newCategory);
  }

  removeCategory(name: string): void {
    this.categories = this.categories.filter(
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

  addProductToCart(
    cartId: string,
    productToCart: ProductToCartData
  ): void | string {
    const cart = this.findCart(cartId);
    const productStock = this.findProduct(productToCart.productId);

    if (!cart) {
      return 'Cart not found';
    }

    if (!productStock) {
      return 'Cart not found';
    }

    this.checkIfNotGraterThanStock(productToCart.amount, productStock.quantity);

    cart.addProduct({
      product: productStock.product,
      amount: productToCart.amount,
    });

    this.decreaseProductQuantity(productStock, productToCart.amount);
  }

  setCartDiscount(cartId: string, discount: Discounts) {
    const cart = this.findCart(cartId);

    if (!cart) {
      return 'Cart not found!';
    }

    if (this.checkDiscountCode(discount)) {
      cart.setDiscount(discount);
    }
  }

  removeCart(id: string): void {
    const cart = this.findCart(id);

    if (cart.productList.length > 0) {
      this.restockProductQuantity(cart);
    }

    this.carts = this.carts.filter((cart) => cart.id !== id);
  }

  removeProductFromCart(cartId: string, productId: string): void {
    const cart = this.findCart(cartId);

    cart.removeProduct(productId);
  }

  removeAllProductsFromCart(cartId: string): void {
    const cart = this.findCart(cartId);

    cart.removeAllProducts;
  }

  private restockProductQuantity(cart: Cart): void {
    cart.productList.forEach((cartItem) => {
      const productToRestock = this.findProduct(cartItem.product.id);
      this.increaseProductQuantity(productToRestock, cartItem.amount);
    });
  }

  private increaseProductQuantity(
    product: ProductStock,
    increaseQuantity: number
  ) {
    product.quantity += increaseQuantity;
  }

  private decreaseProductQuantity(
    product: ProductStock,
    decreaseQuantity: number
  ) {
    product.quantity -= decreaseQuantity;
  }

  private findProduct(id: string): ProductStock | null {
    const product = this.products.find((item) => item.product.id === id);
    return product ? product : null;
  }

  private findCategory(categoryName: string): boolean {
    return this.categories.some((category) => category === categoryName);
  }

  private checkDiscountCode(discount: number): boolean {
    return this.availableDiscountCodes.some((code) => code === discount);
  }

  private addUsedCodeToHistory(discount: number) {
    this.usedDiscountCodes.push(Discounts[discount]);

    const discountIndex = this.availableDiscountCodes.indexOf(discount);

    this.availableDiscountCodes = this.availableDiscountCodes.filter(
      (discount, index) => index !== discountIndex
    );
  }

  private findCart(id: string): Cart | null {
    const cart = this.carts.find((cart) => cart.id === id);
    return cart ? cart : null;
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
