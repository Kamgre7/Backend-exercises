export const luhnAlgorithm = (cardNumber: string): boolean => {
  const reversedCardNumber = reverseCardNumberDigit(cardNumber);
  const cardDigitSum = reversedCardNumber.reduce(sumNumbers, 0);

  return cardDigitSum % 10 === 0;
};

function reverseCardNumberDigit(cardNumber: string): number[] {
  return cardNumber
    .split('')
    .map((digit) => Number(digit))
    .reverse();
}

function sumDoubledDigitNumber(digit: number): number {
  return String(digit)
    .split('')
    .reduce((a, b) => a + Number(b), 0);
}

function sumNumbers(prev: number, curr: number, index: number): number {
  if (index % 2 === 0) return prev + curr;

  const doubledDigit = curr * 2;

  return doubledDigit > 9
    ? prev + sumDoubledDigitNumber(doubledDigit)
    : prev + doubledDigit;
}
