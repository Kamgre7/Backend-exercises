export const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const generateArrayWithRandomNumbers = (
  howManyNumbers: number,
  min: number,
  max: number
): number[] => {
  validateRange(min, max, howManyNumbers);

  return Array.from({ length: howManyNumbers }, () => randomNumber(min, max));
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

function maxGreaterThanMin(min: number, max: number) {
  if (min > max) {
    throw new Error('Min cannot be greater than max');
  }
}

function checkIfPositive(min: number, max: number, howManyNumbers: number) {
  if (min < 0 || max <= 0 || howManyNumbers <= 0) {
    throw new Error(
      'Min must be grater or equal to zero, max must be greater than min'
    );
  }
}

function numberIsInteger(min: number, max: number, howManyNumbers: number) {
  if (
    !Number.isInteger(min) ||
    !Number.isInteger(max) ||
    !Number.isInteger(howManyNumbers)
  ) {
    throw new Error('Min and max must be integers');
  }
}

function validateRange(min: number, max: number, howManyNumbers: number) {
  maxGreaterThanMin(min, max);
  checkIfPositive(min, max, howManyNumbers);
  numberIsInteger(min, max, howManyNumbers);
}
