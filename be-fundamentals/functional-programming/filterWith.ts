import { dataObj } from './data';

export const checkPhrase = (sentence: string, phrase: RegExp): boolean =>
  phrase.test(sentence);

export const findPhraseInWord = <T>(array: T[], phrase: RegExp): boolean =>
  array.some((element) =>
    typeof element === 'object'
      ? findPhraseInWord(Object.values(element), phrase)
      : checkPhrase(String(element), phrase)
  );

export function filterWith<T extends Object>(arr: T[], phrase: string): T[] {
  const phraseRegExp = new RegExp(phrase, 'gi');

  if (String(phrase).length <= 2) return [];

  const filteredArr = arr.filter(<K>(element: T) => {
    const objValues: K[] = Object.values(element);

    return findPhraseInWord(objValues, phraseRegExp);
  });

  return filteredArr;
}

export const result = filterWith(dataObj, 'Cummings Baxter');
export const result2 = filterWith(dataObj, 'nisi');
export const result3 = filterWith(dataObj, 'Delacruz Acevedo');
