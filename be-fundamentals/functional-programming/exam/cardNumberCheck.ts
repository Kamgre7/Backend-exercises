import { luhnAlgorithm } from './luhnAlgorithm';

type cardVerification = {
  isLegal: boolean;
  bank?: string;
};

const bankCardNumberRequirements = {
  Mastercard: /^5[1-5]\d{14}$/,
  Visa: /^4\d{12}(?:\d{3})?$/,
  AmericanExpress: /^3(4|7)\d{13}$/,
  Discover:
    /^6(?:011\d{12}|5\d{14}|4[4-9]\d{13}|22(?:1(?:2[6-9]|[3-9]\d)|[2-8]\d{2}|9(?:[01]\d|2[0-5]))\d{10})$/,
};

const whitespaceRegExp = /[- \.]/g;

export function cardNumberCheck(card: string | number): cardVerification {
  const cardNumber =
    typeof card === 'number'
      ? String(card).replace(whitespaceRegExp, '')
      : card.replace(whitespaceRegExp, '');

  isInteger(cardNumber);

  if (!luhnAlgorithm(cardNumber)) {
    return {
      isLegal: false,
    };
  }

  const bank = whichBank(cardNumber);

  return bank !== null
    ? {
        isLegal: true,
        bank,
      }
    : {
        isLegal: true,
        bank: 'Bank not in database',
      };
}

function isInteger(cardNumber: string): void {
  if (!parseInt(cardNumber, 10)) {
    throw new Error('Invalid card number');
  }
}

function whichBank(cardNumber: string): string | null {
  const findBank =
    Object.entries(bankCardNumberRequirements).find(([, regExp]) =>
      regExp.test(cardNumber)
    ) ?? null;

  return findBank !== null ? findBank[0] : null;
}
