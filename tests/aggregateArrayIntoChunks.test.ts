import { aggregateIntoChunks } from '../be-fundamentals/functional-programming/aggregateArrayIntoChunks';

const alphabet = 'abcdefghijklmnoprstuwxyz'.split('');
const alphabetChunks = aggregateIntoChunks(alphabet);
const sumChunkLength = alphabetChunks.reduce(
  (prev, curr) => prev + curr.length,
  0
);

describe('Test aggregateArrayIntoChunks function', () => {
  it('AggregateArrayIntoChunks function should be defined', () => {
    expect(aggregateIntoChunks).toBeDefined();
  });

  it('Sum of length all array element should be equal input array length', () => {
    expect(alphabet.length).toBe(sumChunkLength);
  });

  it('Should return an array of number[]', () => {
    expect(
      alphabetChunks.every((element) => Array.isArray(element))
    ).toBeTruthy();
  });
});
