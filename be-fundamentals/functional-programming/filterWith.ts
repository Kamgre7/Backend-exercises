import { dataObj } from './data';

export const checkPhrase = (sentence: string, phrase: RegExp): boolean =>
  phrase.test(sentence);

export const findPhraseInWord = <T>(array: T[], phrase: RegExp): boolean =>
  array.some((element) => {
    if (Array.isArray(element)) {
      return findPhraseInWord(element, phrase);
    } else if (typeof element === 'object') {
      return findPhraseInWord(Object.values(element), phrase);
    }

    return checkPhrase(String(element), phrase);
  });

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

/*  return array.some((element) =>
    typeof element === 'object'
      ? findPhraseInArray(Object.values(element), phrase)
      : phrase.test(String(element))
  ); */

/* 
    return objValues.some((value) => {
      if (Array.isArray(value)) return findPhraseInArray(value, phraseRegExp);

      return checkPhrase(String(value), phraseRegExp);
    }); */

/*   if (typeof element === 'object') {
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

    return result;*/
