import { Product } from './Product';
import { ProductStock } from './Shop-system';

export const car = new Product({
  name: 'Fiat',
  category: 'Car',
  price: 1000,
});

export const smartphone = new Product({
  name: 'Nokia',
  category: 'Smartphone',
  price: 50,
});

export const watch = new Product({
  name: 'Garmin',
  category: 'Watch',
  price: 2000,
});

export const book = new Product({
  name: 'Harry Potter',
  category: 'Book',
  price: 17,
});

export const bread = new Product({
  name: 'Bread',
  category: 'Food',
  price: 2,
});

export const shopProductDb: ProductStock[] = [
  { product: car, quantity: 10 },
  { product: smartphone, quantity: 57 },
  { product: book, quantity: 200 },
  { product: bread, quantity: 24 },
  { product: watch, quantity: 7 },
];

export const shopCategoryDb: string[] = [
  'Watch',
  'Car',
  'Smartphone',
  'Book',
  'Food',
];
