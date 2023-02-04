import {
  everyFn,
  filterFn,
  forEachFn,
  mapFn,
  reduceFn,
  someFn,
} from '../../be-fundamentals/functional-programming/arrayMethods-medium';

const numberArray = [1, 2, 3, 4, 5];
const mappedArray = [2, 4, 6, 8, 10];
const evenNumberArray = [2, 4];
const oddNumberArray = [1, 3];

describe('Test array methods: forEach, filter, map, reduce, every, some using for loop, need to provide 2 parameters: array and cb ', () => {
  describe('forEach', () => {
    it('Should return undefined', () => {
      expect(
        forEachFn(numberArray, (element, indexElement) => element)
      ).toBeUndefined();
    });
  });

  describe('map method', () => {
    it('Should return array of numbers multiplied by 2', () => {
      expect(mapFn(numberArray, (element) => element * 2)).toStrictEqual(
        mappedArray
      );
    });

    it('Should return array with the same length as input array', () => {
      expect(mapFn(numberArray, (element) => element * 2)).toHaveLength(
        numberArray.length
      );
    });
  });

  describe('filter method', () => {
    it('Should return array of even numbers', () => {
      expect(
        filterFn(numberArray, (element) => element % 2 === 0)
      ).toStrictEqual(evenNumberArray);
    });
  });

  describe('reduce method', () => {
    it('Should return sum of numbers in array - with initial parameter', () => {
      expect(reduceFn(numberArray, (prev, curr) => prev + curr, 0)).toBe(15);
    });

    it('Should return sum of numbers in array - without initial parameter', () => {
      expect(
        reduceFn(numberArray, (prev, curr) => Number(prev) + Number(curr))
      ).toBe(15);
    });
  });

  describe('every method', () => {
    it('Should return true - all elements of array are even numbers', () => {
      expect(
        everyFn(evenNumberArray, (element) => element % 2 === 0)
      ).toBeTruthy();
    });

    it('Should return false - all elements of array are not even numbers', () => {
      expect(everyFn(numberArray, (element) => element % 2 === 0)).toBeFalsy();
    });
  });

  describe('some method', () => {
    it('Should return true - some elements are even number', () => {
      expect(someFn(numberArray, (element) => element % 2 === 0)).toBeTruthy();
    });

    it('Should return false - none element is even number', () => {
      expect(
        someFn(oddNumberArray, (element) => element % 2 === 0)
      ).toBeFalsy();
    });
  });
});
