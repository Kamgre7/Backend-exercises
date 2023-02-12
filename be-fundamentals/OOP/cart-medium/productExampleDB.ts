import { Product } from './Product';

const car = new Product({
  name: 'Fiat',
  category: 'Car',
  price: 1000,
  quantity: 10,
});

const smartphone = new Product({
  name: 'Nokia',
  category: 'Smartphone',
  price: 50,
  quantity: 57,
});

const watch = new Product({
  name: 'Garmin',
  category: 'Watch',
  price: 2000,
  quantity: 200,
});

const book = new Product({
  name: 'Harry Potter',
  category: 'Book',
  price: 17,
  quantity: 7,
});

const bread = new Product({
  name: 'Bread',
  category: 'Food',
  price: 2,
  quantity: 24,
});

export const shopProductDb: Product[] = [car, smartphone, book, bread, watch];
