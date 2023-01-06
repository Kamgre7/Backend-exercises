export const generateArrayWithRandomNumbers = (
  howManyNumbers: number,
  min: number,
  max: number
): number[] => {
  const randomNumber = () => Math.floor(Math.random() * (max - min + 1) + min);

  return Array.from(Array(howManyNumbers), () => randomNumber());
};

export const generateArrayOfArrays = (
  howManyArrays: number,
  howManyNumbers: number,
  min: number,
  max: number
): Array<number[]> =>
  Array.from(Array(howManyArrays), () =>
    generateArrayWithRandomNumbers(howManyNumbers, min, max)
  );

console.log(generateArrayWithRandomNumbers(5, 1, 10));
console.log(generateArrayOfArrays(4, 2, 1, 10));
