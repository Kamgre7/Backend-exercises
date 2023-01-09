import {
  findPhraseInArray,
  inputData,
} from '../be-fundamentals/functional-programming/findPhraseInArray-easy';

test('function findPhraseInArray should be defined before use', () => {
  expect(findPhraseInArray).toBeDefined();
});

test('array called to findPhraseInArray function should be defined', () => {
  expect(inputData).toBeDefined();
});

test('array is not null', () => {
  expect(inputData).not.toBeNull();
});

test('First parameter should be an array', () => {
  expect(inputData).toBeInstanceOf(Array);
});

test('result contains items with "ball" term and index of word in array', () => {
  expect(findPhraseInArray(inputData, 'ball')).toStrictEqual([
    [1, 'volleyball'],
    [9, 'football'],
    [11, 'basketball'],
  ]);
});

test('Return string with information about not found items', () => {
  expect(findPhraseInArray(inputData, 'test')).toBe(
    'Searched term does not exist'
  );
});
