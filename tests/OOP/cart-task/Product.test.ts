import { Product } from '../../../be-fundamentals/OOP/cart-medium/Product';
import { Discounts } from '../../../be-fundamentals/OOP/cart-medium/types';

let smartphone: Product;

beforeEach(() => {
  smartphone = new Product({
    name: 'smartphone',
    price: 100,
    category: 'phone',
  });
});

describe('Product', () => {
  it('Should be instance of Product class', () => {
    expect(smartphone).toBeInstanceOf(Product);
  });

  it('Should have default value of discount - 0', () => {
    expect(smartphone.discount).toBe(0);
  });

  it('Should change discount value to 50', () => {
    smartphone.setDiscount(Discounts.FIFTY_PERCENT_DISCOUNT);
    expect(smartphone.finalPrice()).toBe(50);
  });

  it('Should update name to "super-smartphone"', () => {
    smartphone.setName('super-smartphone');
    expect(smartphone.name).toBe('super-smartphone');
  });

  it('Should change price to 32$', () => {
    smartphone.setPrice(32);
    expect(smartphone.price).toBe(32);
  });

  it('Should change category to "watches"', () => {
    smartphone.setCategory('watches');
    expect(smartphone.category).toBe('watches');
  });

  describe('Throwing error while Product will get incorrect data when creating or updating', () => {
    it('Should throw error when creating with price below or equal 0', () => {
      expect(() => {
        new Product({ name: 'Burger', price: 0, category: 'Food' });
      }).toThrow();
    });

    it('Should throw error when creating with an empty name', () => {
      expect(() => {
        new Product({ name: '', price: 10, category: 'Food' });
      }).toThrow();
    });

    it('Should throw error when creating with an empty category', () => {
      expect(() => {
        new Product({ name: 'Burger', price: 10, category: '' });
      }).toThrow();
    });

    it('Should throw error when updating with price below or equal 0', () => {
      expect(() => {
        smartphone.setPrice(-10);
      }).toThrow();
    });

    it('Should throw error when updating with an empty name', () => {
      expect(() => {
        smartphone.setName('');
      }).toThrow();
    });

    it('Should throw error when updating with an empty category', () => {
      expect(() => {
        smartphone.setCategory('');
      }).toThrow();
    });
  });
});
