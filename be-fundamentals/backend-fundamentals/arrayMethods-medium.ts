export const randomNumbArr = [1, 2, 3, 4, 5, 6, 7, 8];
export const randomObjArr = [
  { name: 'Lola', age: 22 },
  { name: 'Jan', age: 30 },
  { name: 'Rex', age: 2 },
];

const forEachFn = <T>(
  array: T[],
  callback: (element: T, indexElement?: number) => void
): undefined => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i);
  }

  return undefined;
};

forEachFn(randomNumbArr, (element, indexElement) =>
  console.log(element, indexElement)
);

// **********************************************************************

const mapFn = <T, K>(
  array: T[],
  callback: (element: T, indexElement?: number) => K
): K[] => {
  const mapArray: K[] = [];

  for (let i = 0; i < array.length; i++) {
    const newElement = callback(array[i], i);
    mapArray.push(newElement);
    // mapArray[mapArray.length]=newElement;
  }

  return mapArray;
};

mapFn(randomNumbArr, (element, index) => element.toString());
mapFn(randomNumbArr, (element, index) => element * 2);

// **********************************************************************

export function* entriesFn2<T>(array: T[]) {
  let index = 0;
  while (index <= array.length) {
    yield array[index++];
  }
}

const newResult = entriesFn2(randomObjArr);
console.log('result', newResult.next().value);

// **********************************************************************

export const entriesFn = <T>(array: T[]): [number, T][] => {
  const entriesArray = [];

  for (let i = 0; i < array.length; i++) {
    const newElement: [number, T] = [i, array[i]];
    entriesArray.push(newElement);
  }

  return entriesArray;
};

for (const [index, element] of entriesFn(randomObjArr)) {
  console.log(index, element);
}

// **********************************************************************

export const filterFn = <T>(
  array: T[],
  callback: (element: T, indexElement?: number) => boolean
): T[] => {
  const filteredArray: T[] = [];

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) filteredArray.push(array[i]);
  }

  return filteredArray;
};

filterFn(randomNumbArr, (element) => element % 2 === 0);

// **********************************************************************

export const reduceFn = <T, K>(
  array: T[],
  callback: (
    accumulator: K,
    currentValue: T,
    currentIndex?: number,
    array?: T[]
  ) => K,
  initial?: K
): K => {
  let result = initial;

  for (let i = 0; i < array.length; i++) {
    result = callback(result, array[i]);
  }

  return result;
};

export const reduceFn2 = <T, K>(
  array: T[],
  callback: (
    accumulator: T | K,
    currentValue: T,
    currentIndex?: number,
    array?: T[]
  ) => K,
  initial?: K
): K => {
  let i = initial ? 0 : 1;
  let result = initial ?? callback(array[0], array[1]);

  for (i; i < array.length; i++) {
    result = callback(result, array[i]);
  }

  return result;
};

// **********************************************************************

export const everyFn = <T>(
  array: T[],
  callback: (element: T, indexElement?: number) => boolean
): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (!callback(array[i], i)) return false;
  }

  return true;
};

everyFn(randomNumbArr, (element) => element % 2 === 0);

// **********************************************************************

export const someFn = <T>(
  array: T[],
  callback: (element: T, indexElement: number) => boolean
): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i)) return true;
  }

  return false;
};

someFn(randomNumbArr, (element) => element % 2 === 0);
