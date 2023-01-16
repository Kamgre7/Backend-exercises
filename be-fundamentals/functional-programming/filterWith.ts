import { dataObj } from './data';

export const checkPhrase = (sentence: string, phrase: RegExp): boolean =>
  phrase.test(sentence);

export function filterWith<T>(arr: T[], phrase: string): T[] {
  const phraseRegExp = new RegExp(phrase, 'gi');

  if (String(phrase).length <= 2) return [];

  const filteredArr = arr.filter((element) => {
    if (typeof element === 'object') {
      let result = false;

      for (const value of Object.values(element)) {
        if (Array.isArray(value)) {
          if (filterWith(value, phrase).length > 0) result = true;
        } else {
          if (checkPhrase(String(value), phraseRegExp)) result = true;
        }
      }

      return result;
    } else if (typeof element === 'string' || typeof element === 'number') {
      return checkPhrase(String(element), phraseRegExp);
    } else if (Array.isArray(element)) {
      return filterWith(element, phrase).length > 0;
    }
  });

  return filteredArr;
}

export const result = filterWith(dataObj, 'Delacruz Acevedo');
export const result2 = filterWith(dataObj, 'Cummings Baxter');
export const result3 = filterWith(dataObj, 'nisi');
