import {
  paginateArray,
  data,
  settings,
} from '../be-fundamentals/functional-programming/pagination';

test('function pagination should be defined before use', () => {
  expect(paginateArray).toBeDefined();
});

test('Result should be [4,5,6]', () => {
  expect(paginateArray(data, settings)).toStrictEqual([4, 5, 6]);
});

test('Throw error when pagesCount is lower than actual pageIndex', () => {
  expect(() =>
    paginateArray(data, { actualPageIdx: 30, entriesOnPage: 10 })
  ).toThrow();
});

test('Throw error when actual pageIndex is lower than 0', () => {
  expect(() =>
    paginateArray(data, { actualPageIdx: -5, entriesOnPage: 1 })
  ).toThrow();
});

test('Throw error when entriesOnPage is grater than array elements length', () => {
  expect(() =>
    paginateArray(data, { actualPageIdx: 2, entriesOnPage: 999 })
  ).toThrow();
});
