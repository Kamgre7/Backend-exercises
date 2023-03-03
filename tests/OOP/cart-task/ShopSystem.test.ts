import { Product } from '../../../be-fundamentals/OOP/cart-medium/Product';
import {
  ProductStock,
  ProductToCartData,
  ShopSystem,
} from '../../../be-fundamentals/OOP/cart-medium/Shop-system';
import { Discounts } from '../../../be-fundamentals/OOP/cart-medium/types';

let car: Product;
let smartphone: Product;
let book: Product;
let productsList: ProductStock[];
let categoriesList: string[];
let newCartId: string;
let carToCart: ProductToCartData;
let smartphoneToCart: ProductToCartData;

beforeEach(() => {
  car = new Product({
    name: 'Fiat',
    category: 'Car',
    price: 1000,
  });

  smartphone = new Product({
    name: 'Nokia',
    category: 'Smartphone',
    price: 50,
  });

  book = new Product({
    name: 'Harry Potter',
    category: 'Book',
    price: 17,
  });

  productsList = [
    { product: car, quantity: 10 },
    { product: smartphone, quantity: 5 },
  ];

  categoriesList = ['Car', 'Smartphone', 'Book', 'Bike'];

  shopSystem.carts.length = 0;

  newCartId = shopSystem.addCart();

  shopSystem.products = productsList;
  shopSystem.categories = categoriesList;

  carToCart = {
    productId: car.id,
    amount: 5,
  };

  smartphoneToCart = {
    productId: smartphone.id,
    amount: 1,
  };
});

const shopSystem = ShopSystem.getInstance();

describe('ShopSystem', () => {
  it('Should be instance of ShopSystem class', () => {
    expect(shopSystem).toBeInstanceOf(ShopSystem);
  });

  it('Should return already created ShopSystem instance, after trying to create a new instance of ShopsSystem', () => {
    const secondShopSystem = ShopSystem.getInstance();
    expect(shopSystem).toStrictEqual(secondShopSystem);
  });

  describe('Product management', () => {
    it('Should return list of products', () => {
      expect(shopSystem.showProducts()).toStrictEqual(productsList);
    });

    it('Should add book to products list', () => {
      shopSystem.addProduct({
        product: book,
        quantity: 5,
      });

      expect(shopSystem.showProducts()).toContainEqual({
        product: book,
        quantity: 5,
      });
    });

    it('Should remove car from products list', () => {
      expect(shopSystem.showProducts()).toContainEqual({
        product: car,
        quantity: 10,
      });

      shopSystem.removeProduct(car.id);

      expect(shopSystem.showProducts()).not.toContainEqual({
        product: car,
        quantity: 10,
      });
    });

    it('Should change car discount - default 0', () => {
      shopSystem.setProductDiscount(car.id, Discounts.TEN_PERCENT_DISCOUNT);

      expect(car.discount).toBe(Discounts.TEN_PERCENT_DISCOUNT);
    });

    it('Should change car name', () => {
      shopSystem.setProductName(car.id, 'fast-car');

      expect(car.name).toBe('fast-car');
    });

    it('Should change car price', () => {
      shopSystem.setProductPrice(car.id, 10);

      expect(car.price).toBe(10);
    });

    it('Should change car category', () => {
      shopSystem.setProductCategory(car.id, 'Bike');

      expect(car.category).toBe('Bike');
    });
  });

  describe('Category management', () => {
    it('Should return list of categories', () => {
      expect(shopSystem.showCategories()).toStrictEqual(categoriesList);
    });

    it('Should add Lamp to categories', () => {
      shopSystem.addCategory('Lamp');

      expect(shopSystem.showCategories()).toContain('Lamp');
    });

    it('Should remove Lamp from categories list', () => {
      shopSystem.addCategory('Lamp');
      expect(shopSystem.showCategories()).toContain('Lamp');

      shopSystem.removeCategory('Lamp');
      expect(shopSystem.showCategories()).not.toContain('Lamp');
    });
  });

  describe('Cart management', () => {
    it('Should add new cart to cart list', () => {
      const cart = shopSystem.addCart();

      expect(shopSystem.carts).toContainEqual({
        id: cart,
        discount: 0,
        productList: [],
      });
    });

    it('Should add product to cart', () => {
      const cart = shopSystem.findCart(newCartId);
      shopSystem.addProductToCart(newCartId, carToCart);

      expect(cart.productList).toContainEqual({
        product: car,
        amount: 5,
      });
    });

    it('Should decrease car quantity after adding to cart from 10 to 5', () => {
      expect(shopSystem.showProducts()).toContainEqual({
        product: car,
        quantity: 10,
      });

      shopSystem.addProductToCart(newCartId, carToCart);

      expect(shopSystem.showProducts()).toContainEqual({
        product: car,
        quantity: 5,
      });
    });

    it('Should change cart discount', () => {
      const cart = shopSystem.findCart(newCartId);

      shopSystem.setCartDiscount(newCartId, Discounts.FIFTY_PERCENT_DISCOUNT);

      expect(cart.discount).toBe(Discounts.FIFTY_PERCENT_DISCOUNT);
    });

    it('Should remove 1 product from cart', () => {
      const cart = shopSystem.findCart(newCartId);

      shopSystem.addProductToCart(newCartId, carToCart);

      expect(cart.productList).toContainEqual({
        product: car,
        amount: 5,
      });

      shopSystem.removeProductFromCart(newCartId, car.id);

      expect(cart.productList).not.toContainEqual({
        product: car,
        amount: 5,
      });
    });

    it('Should remove all products from cart', () => {
      const cart = shopSystem.findCart(newCartId);
      shopSystem.addProductToCart(newCartId, carToCart);
      shopSystem.addProductToCart(newCartId, smartphoneToCart);

      expect(cart.productList).toHaveLength(2);

      shopSystem.removeAllProductsFromCart(newCartId);

      expect(cart.productList).not.toHaveLength(2);
    });
  });

  it('Should restock product quantity after removing from cart', () => {
    shopSystem.addProductToCart(newCartId, carToCart);

    expect(shopSystem.products).toContainEqual({ product: car, quantity: 5 });

    shopSystem.removeProductFromCart(newCartId, car.id);

    expect(shopSystem.products).toContainEqual({ product: car, quantity: 10 });
  });

  it('Should add cart to finalized order list and remove cart', () => {
    shopSystem.addProductToCart(newCartId, carToCart);

    expect(shopSystem.finalizedOrderList.size).toBe(0);

    shopSystem.finalizeOrder(newCartId);

    expect(shopSystem.finalizedOrderList.has(newCartId)).toBeTruthy();

    expect(() => {
      shopSystem.findCart(newCartId);
    }).toThrow();
  });
});
