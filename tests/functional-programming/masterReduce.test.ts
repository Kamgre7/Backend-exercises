import {
  everyFn,
  filterFn,
  mapFn,
  someFn,
} from '../../be-fundamentals/functional-programming/masterReduce';

const numberArray = [1, 2, 3, 4, 5];
const numberArrMultipliedByTwo = [2, 4, 6, 8, 10];
const evenNumberArray = [2, 4];
const oddNumberArray = [1, 3];
const mappedArray = mapFn(numberArray, (element) => element * 2);

describe('Test array methods: map, filter, every, some using .reduce method', () => {
  describe('array.map', () => {
    it('Should return array of numbers multiplied by 2', () => {
      expect(mapFn(numberArray, (element) => element * 2)).toStrictEqual(
        numberArrMultipliedByTwo
      );
    });

    it('Should return array with the same length as input array', () => {
      expect(mapFn(numberArray, (element) => element * 2)).toHaveLength(
        numberArray.length
      );
    });

    it('All elements in new array should be number type', () => {
      expect(
        mappedArray.every((element) => typeof element === 'number')
      ).toBeTruthy();
    });
  });

  describe('array.filter', () => {
    it('Should return array of even numbers', () => {
      expect(
        filterFn(numberArray, (element) => element % 2 === 0)
      ).toStrictEqual(evenNumberArray);
    });

    it('Should return array of odd numbers', () => {
      expect(
        filterFn(numberArray, (element) => element % 2 !== 0)
      ).toStrictEqual(oddNumberArray);
    });
  });

  describe('array.every', () => {
    it('Should return true - all elements of array are even numbers', () => {
      expect(
        everyFn(evenNumberArray, (element) => element % 2 === 0)
      ).toBeTruthy();
    });

    it('Should return false - all elements of array are not even numbers', () => {
      expect(everyFn(numberArray, (element) => element % 2 !== 0)).toBeFalsy();
    });
  });

  describe('array.some', () => {
    it('Should return true - some elements are even number', () => {
      expect(someFn(numberArray, (element) => element % 2 === 0)).toBeTruthy();
    });

    it('Should return false - none element is even number', () => {
      expect(
        everyFn(oddNumberArray, (element) => element % 2 === 0)
      ).toBeFalsy();
    });
  });
});
