function checkNumbers(min: number, max: number, howManyNumbers: number) {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
  if (min < 0 || max <= 0 || howManyNumbers <= 0) {
    throw new Error(
      'Min must be grater or equal to zero, max must be greater than min'
    );
  }
  if (
    !Number.isInteger(min) ||
    !Number.isInteger(max) ||
    !Number.isInteger(howManyNumbers)
  ) {
    throw new Error('Min and max must be integers');
  }
}

export const generateArrayWithRandomNumbers = (
  howManyNumbers: number,
  min: number,
  max: number
): number[] => {
  checkNumbers(min, max, howManyNumbers);

  const randomNumber = () => Math.floor(Math.random() * (max - min + 1) + min);
  return Array.from({ length: howManyNumbers }, () => randomNumber());
};

export const generateArrayOfArrays = (
  howManyArrays: number,
  howManyNumbers: number,
  min: number,
  max: number
): number[][] =>
  Array.from({ length: howManyArrays }, () =>
    generateArrayWithRandomNumbers(howManyNumbers, min, max)
  );

generateArrayWithRandomNumbers(5, 1, 10);
generateArrayOfArrays(4, 2, 1, 10);
