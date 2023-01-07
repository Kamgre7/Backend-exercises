import { reduceFn } from './be-fundamentals/arrayMethods-medium';

const flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
];
// flattened is [0, 1, 2, 3, 4, 5]

const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

const reducer1 = reduceFn(
  names,
  (accumulator, currentValue) => {
    const currCount = (accumulator as any)[currentValue] ?? 0;
    return {
      ...accumulator,
      [currentValue]: currCount + 1,
    };
  },
  {}
);

const reducer = reduceFn(
  flattened,
  (accumulator, currentValue) => accumulator.concat(currentValue),
  []
);

console.log('reducer1', reducer1);
