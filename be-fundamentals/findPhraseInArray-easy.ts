type termArr = Array<[number, string]>;
type findPhrase = termArr | string;

export const inputData = [
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
  const regex = new RegExp(phrase, 'gi');

  const result: termArr = inputData.reduce((prev, curr, index) => {
    if (regex.test(curr)) return [...prev, [index, curr]];

    return prev;
  }, []);

  return result.length > 0 ? result : 'Searched term does not exist';
};

findPhraseInArray(inputData, 'ball');
findPhraseInArray(inputData, 'day');
