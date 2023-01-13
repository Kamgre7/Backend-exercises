export const randomNumbArray = [1, 2, 3, 4, 5, 6, 7, 8];
export const randomObjArr = [
  { name: 'Lola', age: 22 },
  { name: 'Jan', age: 30 },
  { name: 'Rex', age: 2 },
];

export const mapFn = <T, K>(
  array: T[],
  callback: (element: T, index?: number) => K
): K[] =>
  array.reduce<K[]>(
    (prev, curr, index) => [...prev, callback(curr, index)],
    []
  );

mapFn(randomNumbArray, (element, index) => element * 2);

//*************************************************************************************

export const filterFn = <T>(
  array: T[],
  callback: (element: T, index?: number) => boolean
): T[] =>
  array.reduce<T[]>(
    (prev, curr, index) =>
      callback(curr, index) ? [...prev, curr] : [...prev],
    []
  );

filterFn(randomNumbArray, (element) => element % 2 === 0);

//*************************************************************************************

export const everyFn = <T>(
  array: T[],
  callback: (element: T, index?: number) => boolean
): boolean => {
  const everyResult = array.slice(0).reduce((prev, curr, index, arr) => {
    if (!callback(curr, index)) {
      arr.length = 0;
      return false;
    }
    return prev;
  }, true);

  return everyResult;
};

everyFn(randomNumbArray, (element, index) => element % 2 === 0);

//*************************************************************************************

export const someFn = <T>(
  array: T[],
  callback: (element: T, index?: number) => boolean
): boolean => {
  const someResult = array.slice(0).reduce((prev, curr, index, arr) => {
    if (callback(curr, index)) {
      arr.length = 0;
      return true;
    }
    return prev;
  }, false);

  return someResult;
};

someFn(randomNumbArray, (element, index) => element % 2 === 0);
