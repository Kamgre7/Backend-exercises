type termArr = Array<[number, string]>;
type findPhrase = termArr | string;

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

export const findPhraseInArray = (
  inputData: string[],
  phrase: string
): findPhrase => {
  const phraseArr: termArr = [];

  inputData.forEach((word, index) => {
    if (word.includes(phrase)) phraseArr.push([index, word]);
  });

  return phraseArr.length > 0 ? phraseArr : 'Searched term does not exist';
};

console.log(findPhraseInArray(inputData, 'ball'));
console.log(findPhraseInArray(inputData, 'ball'));
