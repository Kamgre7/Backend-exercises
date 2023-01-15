export const luhnAlgorithm = (cardNumber: string): boolean => {
  const cardDigitSum = cardNumber
    .split('')
    .reverse()
    .reduce((prev, curr, index) => {
      if (index % 2 === 0) {
        return prev + Number(curr);
      }

      const doubledDigit = Number(curr) * 2;

      if (String(doubledDigit).length > 1) {
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
