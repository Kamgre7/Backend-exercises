import { Cart } from '../../be-fundamentals/OOP/cart-medium/Cart';
import { Product } from '../../be-fundamentals/OOP/cart-medium/Product';
import { Discounts } from '../../be-fundamentals/OOP/cart-medium/types';

const smartphone = new Product({
  name: 'smartphone',
  price: 100,
  category: 'phone',
});

const fiat = new Product({
  name: 'Fiat',
  category: 'Car',
  price: 1000,
});

const watch = new Product({
  name: 'Garmin',
  category: 'Watches',
  price: 100,
});

const cart = new Cart();

describe('Testing Cart-medium task. Product class, Cart class and whole Shop System', () => {
  describe('Testing Product class', () => {
    it('Product should be instance of Product class', () => {
      expect(smartphone).toBeInstanceOf(Product);
    });

    it('Product should have an ID number', () => {
      expect(smartphone.id).toBeDefined();
    });

    it('Product discount default should be 0', () => {
      expect(smartphone.discount).toBe(0);
    });

    it('Product final price when discount is changed to 50% should be 50', () => {
      smartphone.setDiscount(Discounts.FIFTY_PERCENT_DISCOUNT);
      expect(smartphone.finalPrice()).toBe(50);
    });

    it('Should update product name to "super-smartphone"', () => {
      smartphone.setName('super-smartphone');
      expect(smartphone.name).toBe('super-smartphone');
    });

    it('Should change product price to 32$', () => {
      smartphone.setPrice(32);
      expect(smartphone.price).toBe(32);
    });

    it('Should change product category to "watches"', () => {
      smartphone.setCategory('watches');
      expect(smartphone.category).toBe('watches');
    });

    it('Should throw error when creating product with price below or equal 0, name or category is empty string', () => {
      expect(() => {
        new Product({ name: 'Test', price: 0, category: 'test' });
      }).toThrow();

      expect(() => {
        new Product({ name: '', price: 10, category: 'test' });
      }).toThrow();

      expect(() => {
        new Product({ name: 'Test', price: 10, category: '' });
      }).toThrow();
    });

    it('Should throw error when updating product with price below or equal 0, name or category is empty string', () => {
      expect(() => {
        smartphone.setCategory('');
      }).toThrow();

      expect(() => {
        smartphone.setName('');
      }).toThrow();

      expect(() => {
        smartphone.setPrice(-10);
      }).toThrow();
    });
  });

  describe('Testing Cart class', () => {
    it('Cart should be instance of Cart class', () => {
      expect(cart).toBeInstanceOf(Cart);
    });

    it('Cart should have an ID number', () => {
      expect(cart.id).toBeDefined();
    });

    it('Cart discount default should be 0', () => {
      expect(cart.discount).toBe(0);
    });

    it('Cart should be empty after creation', () => {
      expect(cart.productList).toHaveLength(0);
    });

    it('Cart should add product with amount to productList', () => {
      cart.addProduct({
        product: fiat,
        amount: 1,
      });

      expect(cart.productList).toHaveLength(1);
    });

    it('Cart should increase product amount when product is already in cart', () => {
      cart.addProduct({
        product: fiat,
        amount: 10,
      });

      expect(cart.productList).toHaveLength(1);
      expect(cart.productList[0].amount).toBe(11);
    });

    it('Cart should add second product with amount to productList', () => {
      cart.addProduct({
        product: watch,
        amount: 5,
      });

      expect(cart.productList).toHaveLength(2);
    });

    it('Cart should throw error after adding products with amount less than 1', () => {
      expect(() => {
        cart.addProduct({
          product: fiat,
          amount: -1,
        });
      }).toThrow();
    });

    it('Should get final price of cart - with discount - now 0%', () => {
      expect(cart.sumCart()).toBe(11500);
    });

    it('Should get final price of cart - with discount - now 10%', () => {
      cart.setDiscount(Discounts.TEN_PERCENT_DISCOUNT);
      expect(cart.sumCart()).toBe(10350);
    });

    it('Should remove item "watch" from cart', () => {
      expect(
        cart.productList.some((item) => item.product.id === watch.id)
      ).toBeTruthy();

      cart.removeProduct(watch.id);

      expect(
        cart.productList.some((item) => item.product.id === watch.id)
      ).toBeFalsy();
    });

    it('Should remove all products from cart', () => {
      cart.removeAllProducts();
      expect(cart.productList).toHaveLength(0);
      expect(cart.sumCart()).toBe(0);
    });
  });
});
