import { findPhraseInArray } from './be-fundamentals/findPhraseInArray-easy';
import {
  generateArrayOfArrays,
  generateArrayWithRandomNumbers,
} from './be-fundamentals/generateArrayWithRandomNumbers-easy';
import { getMyAge } from './be-fundamentals/getMyAge';

const inputData = [
  'create',
  'volleyball',
  'read',
  'police',
  'friday',
  'update',
  'lamp',
  'use',
  'delete',
  'football',
  'ampere',
  'basketball',
  'mouse',
  'cat',
  'monday',
];

// console.log(findPhraseInArray(inputData, 'ball'));
// console.log(generateArrayWithRandomNumbers(5, 1, 10));
// console.log(generateArrayOfArrays(4, 2, 1, 10));
console.log(getMyAge(new Date(1990, 1, 1)));
console.log(getMyAge('1990'));
console.log(getMyAge(1990));
