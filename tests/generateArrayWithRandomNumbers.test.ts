import {
  generateArrayOfArrays,
  generateArrayWithRandomNumbers,
  randomNumber,
} from '../be-fundamentals/functional-programming/generateArrayWithRandomNumbers-easy';

const min = 0;
const max = 10;
const howManyNumbers = 4;
const howManyArrays = 2;
const numberArray = generateArrayWithRandomNumbers(howManyNumbers, min, max);
const arrayOfNumbArrays = generateArrayOfArrays(
  howManyArrays,
  howManyNumbers,
  min,
  max
);

describe('Test generateArrayWithRandomNumber fn', () => {
  it('generateArrayWithRandomNumbers is defined', () => {
    expect(generateArrayWithRandomNumbers).toBeDefined();
  });

  it('Random number is grater or equal "min" variable', () => {
    expect(randomNumber(min, max)).toBeGreaterThanOrEqual(min);
  });

  it('Random number is lesser or equal "max" variable', () => {
    expect(randomNumber(min, max)).toBeLessThanOrEqual(max);
  });

  it('Should return array with length called in howManyNumbers variable', () => {
    expect(numberArray).toHaveLength(howManyNumbers);
  });

  it('should return an array of Number type', () => {
    expect(
      numberArray.every((element) => typeof element === 'number')
    ).toBeTruthy();
  });
});

describe('Test generateArrayOfArrays fn', () => {
  it('generateArrayOfArrays is defined', () => {
    expect(generateArrayOfArrays).toBeDefined();
  });

  it('Should return array with length called in howManyNumbers variable', () => {
    expect(arrayOfNumbArrays).toHaveLength(howManyNumbers);
  });

  it('should return an array of number[]', () => {
    expect(
      arrayOfNumbArrays.every((element) => Array.isArray(element))
    ).toBeTruthy();
  });
});
