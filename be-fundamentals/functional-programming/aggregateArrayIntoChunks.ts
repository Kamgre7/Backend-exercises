const alphabet = 'abcdefghijklmnoprstuwxyz'.split('');

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

const lengthOfAllChunks = (inputArrayLength: number): number[] => {
  const chunksLength: number[] = [];

  do {
    if (sum(chunksLength) > inputArrayLength) {
      chunksLength.length = 0;
    }

    chunksLength.push(randomNumber(4, 7));
  } while (sum(chunksLength) !== inputArrayLength);

  return chunksLength;
};

const aggregateIntoChunks = <T>(array: T[]): T[][] => {
  const chunksIteration = lengthOfAllChunks(array.length);
  const chunksResult: T[][] = [];
  let counter = 0;

  chunksIteration.forEach((element) => {
    const newElement = array.slice(counter, counter + element);
    chunksResult.push(newElement);

    counter += element;
  });

  return chunksResult;
};

export const chunks = aggregateIntoChunks(alphabet);
