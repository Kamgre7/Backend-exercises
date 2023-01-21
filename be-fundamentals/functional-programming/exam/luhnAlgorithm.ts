export const luhnAlgorithm = (cardNumber: string): boolean => {
  const cardDigitSum = cardNumber
    .split('')
    .map((digit) => Number(digit))
    .reverse()
    .reduce((prev, curr, index) => {
      if (index % 2 === 0) {
        return prev + curr;
      }

      const doubledDigit = curr * 2;

      if (doubledDigit > 9) {
        return (
          prev +
          String(doubledDigit)
            .split('')
            .reduce((a, b) => a + Number(b), 0)
        );
      }

      return prev + doubledDigit;
    }, 0);

  return cardDigitSum % 10 === 0;
};
