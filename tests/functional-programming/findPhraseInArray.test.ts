import { findPhraseInArray } from '../../be-fundamentals/functional-programming/findPhraseInArray-easy';

const inputData = [
  'create',
  'volleyball',
  'delete',
  'football',
  'ampere',
  'basketball',
  'mouse',
];

describe('Test fn findPhraseInArray - final result when function find containing items, and when not found ', () => {
  it('result contains items with "ball" term and index of word in array', () => {
    expect(findPhraseInArray(inputData, 'ball')).toStrictEqual([
      [1, 'volleyball'],
      [3, 'football'],
      [5, 'basketball'],
    ]);
  });

  it('Return string with information about not found items', () => {
    expect(findPhraseInArray(inputData, 'test')).toBe(
      'Searched term does not exist'
    );
  });
});
