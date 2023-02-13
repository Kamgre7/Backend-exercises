import { Product } from './Product';

export const car = new Product({
  name: 'Fiat',
  category: 'Car',
  price: 1000,
  quantity: 10,
});

export const smartphone = new Product({
  name: 'Nokia',
  category: 'Smartphone',
  price: 50,
  quantity: 57,
});

export const watch = new Product({
  name: 'Garmin',
  category: 'Watch',
  price: 2000,
  quantity: 200,
});

export const book = new Product({
  name: 'Harry Potter',
  category: 'Book',
  price: 17,
  quantity: 7,
});

export const bread = new Product({
  name: 'Bread',
  category: 'Food',
  price: 2,
  quantity: 24,
});

export const shopProductDb: Product[] = [car, smartphone, book, bread, watch];
export const shopCategoryDb: string[] = [
  'Watch',
  'Car',
  'Smartphone',
  'Book',
  'Food',
];
