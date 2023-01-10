const alphabet = 'abcdefghijklmnoprstuwxyz'.split('');

const randomNumber = () => Math.floor(Math.random() * (7 - 4 + 1) + 4);

const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

const lengthOfAllChunks = (inputArrayLength: number): number[] => {
  const chunksLength: number[] = [];

  do {
    if (sum(chunksLength) > inputArrayLength) {
      chunksLength.length = 0;
    }

    chunksLength.push(randomNumber());
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

// chunks:
// [[a,b,c,d,e,f],[g,h,i,j,k],[l,m,n,o,p,r,s],[t,u,w,x,y,z]]

// *************************** old result

/* 
    const chunksResult = [];
  let counter = 0;

  for (let i = 0; i < array.length; i) {
    const singleChunk = array.slice(i, i + chunksIteration[counter]);
    chunksResult.push(singleChunk);
    i += chunksIteration[counter];
    counter++;
  }
 */
