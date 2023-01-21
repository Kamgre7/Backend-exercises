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

const whitespaceRegExp = /[.- ]/g;

export function cardNumberCheck(card: string | number): cardVerification {
  const cardNumber =
    typeof card === 'number'
      ? String(card).replace(whitespaceRegExp, '')
      : card.replace(whitespaceRegExp, '');

  if (!parseInt(cardNumber, 10)) {
    throw new Error('Invalid card number');
  }

  if (!luhnAlgorithm(cardNumber)) {
    return {
      isLegal: false,
    };
  }

  for (const [key, value] of Object.entries(bankCardNumberRequirements)) {
    if (value.test(cardNumber)) {
      return {
        isLegal: true,
        bank: key,
      };
    }
  }

  return {
    isLegal: true,
    bank: 'Bank not in database',
  };
}
