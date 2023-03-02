import { Cart } from '../../../be-fundamentals/OOP/cart-medium/Cart';
import { Product } from '../../../be-fundamentals/OOP/cart-medium/Product';
import { ShopSystem } from '../../../be-fundamentals/OOP/cart-medium/Shop-system';
import { Discounts } from '../../../be-fundamentals/OOP/cart-medium/types';

let smartphone: Product;
let fiat: Product;
let watch: Product;

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

  watch = new Product({
    name: 'Garmin',
    category: 'Watches',
    price: 100,
  });
});

const cart = new Cart();
const shopSystem = ShopSystem.getInstance();
// KAŻDA KLASA OSOBNO TESTOWANA
describe('Testing Cart-medium task. Product class, Cart class and whole Shop System', () => {
  // zmienić opisy, wiadomo że to test i że to klasa, więc samo 'Product'
  describe('Testing Product class', () => {
    // tutaj bez słowa Product
    it('Product should be instance of Product class', () => {
      expect(smartphone).toBeInstanceOf(Product);
    });
    // test ID zbędny
    it('Product should have an ID number', () => {
      expect(smartphone.id).toBeDefined();
    });

    it('Product discount default should be 0', () => {
      expect(smartphone.discount).toBe(0);
    });
    // zmienic opis, by opisywało że zostało zmienione, powinno zaczynac się should
    it('Product "smartphone" final price when discount is changed to 50% should be 50', () => {
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
    // rozbić na pojedyczne testy , dorobić describe odnosnie rzucania błędów
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
    // tak samo jw
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
    // zbędny z ID
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
      //tocontainequal - lepsze sprawdzenie
      expect(cart.productList).toHaveLength(1);
      expect(cart.productList).toContainEqual({ product: fiat, amount: 1 });
    });

    it('Cart should increase product amount when product is already in cart', () => {
      cart.addProduct({
        product: fiat,
        amount: 10,
      });
      // tocontainequal - zwrpco ilość konkretnie
      expect(cart.productList).toHaveLength(1);
      expect(cart.productList[0].amount).toBe(11);
    });
    // nie testuje dodatkowej logiki, zbędny test - sprawdzone juz na 1 tescie
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
    // nie wiadomo skąd cena, jakie elementy dodane itp, wszystko musi znaleźć się w teście co potrzebne
    it('Should get final price of cart - with discount - now 0%', () => {
      expect(cart.sumCart()).toBe(11500);
    });

    it('Should get final price of cart - with discount - now 10%', () => {
      cart.setDiscount(Discounts.TEN_PERCENT_DISCOUNT);
      expect(cart.sumCart()).toBe(10350);
    });
    // tak samo, wszystko powiino być, nie wiadomo skad co usuwane
    // dodanie testu gdzie srpawdzamy usuwanie nie dodanego itemu
    it('Should remove item "watch" from cart', () => {
      expect(
        cart.productList.some((item) => item.product.id === watch.id)
      ).toBeTruthy();

      cart.removeProduct(watch.id);

      expect(
        cart.productList.some((item) => item.product.id === watch.id)
      ).toBeFalsy();
    });
    // pokazanie ze cart nie jets pusty
    it('Should remove all products from cart', () => {
      cart.removeAllProducts();
      expect(cart.productList).toHaveLength(0);
      expect(cart.sumCart()).toBe(0);
    });
  });
  // testowanie w taki sam sposób jak pozostałe dwie klasy
  describe('Testing ShopSystem class', () => {
    it('ShopSystem should be instance of ShopSystem class', () => {
      expect(shopSystem).toBeInstanceOf(ShopSystem);
    });

    it('An attempt to create a new instance of ShopsSystem should return the first one already created', () => {
      const secondShopSystem = ShopSystem.getInstance();
      expect(shopSystem).toStrictEqual(secondShopSystem);
    });
  });
});
