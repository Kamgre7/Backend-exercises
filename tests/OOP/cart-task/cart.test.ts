import { Cart } from '../../../be-fundamentals/OOP/cart-medium/Cart';
import { Product } from '../../../be-fundamentals/OOP/cart-medium/Product';
import { Discounts } from '../../../be-fundamentals/OOP/cart-medium/types';

let fiat: Product;
let smartphone: Product;
let cart: Cart;

beforeEach(() => {
  smartphone = new Product({
    name: 'smartphone',
    price: 100,
    category: 'phone',
  });

  fiat = new Product({
    name: 'Fiat',
    category: 'Car',
    price: 1000,
  });

  cart = new Cart();
});

describe('Cart', () => {
  it('Should be instance of Cart class', () => {
    expect(cart).toBeInstanceOf(Cart);
  });

  it('Should have default value of discount - 0', () => {
    expect(cart.discount).toBe(0);
  });

  it('Should be empty after creating', () => {
    expect(cart.productList).toHaveLength(0);
  });

  it('Should add fiat product with amount 1 to productList', () => {
    cart.addProduct({
      product: fiat,
      amount: 1,
    });

    expect(cart.productList).toContainEqual({ product: fiat, amount: 1 });
  });

  it('Should increase product amount when product is already in cart', () => {
    cart.addProduct({
      product: fiat,
      amount: 1,
    });

    cart.addProduct({
      product: fiat,
      amount: 10,
    });

    expect(cart.productList).toContainEqual({ product: fiat, amount: 11 });
  });

  it('Should get final price with discount 0% - 10500', () => {
    cart.addProduct({
      product: fiat,
      amount: 10,
    });

    cart.addProduct({
      product: smartphone,
      amount: 5,
    });

    expect(cart.sumCart()).toBe(10500);
  });

  it('Should get final price with discount 50% - 5250', () => {
    cart.addProduct({
      product: fiat,
      amount: 10,
    });

    cart.addProduct({
      product: smartphone,
      amount: 5,
    });

    cart.setDiscount(Discounts.FIFTY_PERCENT_DISCOUNT);

    expect(cart.sumCart()).toBe(5250);
  });

  it('Should remove item smartphone', () => {
    cart.addProduct({
      product: smartphone,
      amount: 5,
    });

    cart.removeProduct(smartphone.id);

    expect(cart.productList).not.toContainEqual({
      product: smartphone,
      amount: 5,
    });
  });

  it('Should remove all products', () => {
    cart.addProduct({
      product: smartphone,
      amount: 1,
    });

    cart.addProduct({
      product: fiat,
      amount: 1,
    });

    expect(cart.productList).not.toHaveLength(0);

    cart.removeAllProducts();

    expect(cart.productList).toHaveLength(0);
  });

  it('Should find added amount of product', () => {
    cart.addProduct({
      product: smartphone,
      amount: 7,
    });

    expect(cart.findProductAmount(smartphone.id)).toBe(7);
  });

  describe('Throwing error while Cart will get incorrect data when updating', () => {
    it('Should throw error after adding product with amount less than 1', () => {
      expect(() => {
        cart.addProduct({
          product: fiat,
          amount: -1,
        });
      }).toThrow();
    });

    it('Should throw error after updating discount more or equal 100%', () => {
      expect(() => {
        cart.setDiscount(1.2);
      }).toThrow();
    });

    it('Should throw error after deleting item which do not exist', () => {
      cart.addProduct({
        product: fiat,
        amount: 1,
      });

      expect(() => {
        cart.removeProduct(smartphone.id);
      }).toThrow();
    });
  });
});
