import { cardNumberCheck } from '../be-fundamentals/functional-programming/exam/cardNumberCheck';
import { luhnAlgorithm } from '../be-fundamentals/functional-programming/exam/luhnAlgorithm';

const checkCreditCardBank = {
  visa: cardNumberCheck(4242424242424242),
  masterCard: cardNumberCheck(5555555555554444),
  americanExpress: cardNumberCheck(378282246310005),
  discover: cardNumberCheck(6011000990139424),
  unionPay: cardNumberCheck(6200000000000005),
  illegalCard: cardNumberCheck(601112590139424),
};

const creditCardBankResult = {
  visa: { isLegal: true, bank: 'Visa' },
  masterCard: { isLegal: true, bank: 'Mastercard' },
  americanExpress: { isLegal: true, bank: 'AmericanExpress' },
  discover: { isLegal: true, bank: 'Discover' },
  unionPay: { isLegal: true, bank: 'Bank not in database' },
  illegalCard: { isLegal: false },
};

describe('Test cardNumberCheck function with Luhn algorithm', () => {
  describe('cardNumberCheck function', () => {
    it('cardNumberCheck function should be defined', () => {
      expect(cardNumberCheck).toBeDefined();
    });

    it('Should return is legal card from Visa', () => {
      expect(checkCreditCardBank.visa).toStrictEqual(creditCardBankResult.visa);
    });

    it('Should return is legal card from discover', () => {
      expect(checkCreditCardBank.discover).toStrictEqual(
        creditCardBankResult.discover
      );
    });

    it('Should return is illegal card', () => {
      expect(checkCreditCardBank.illegalCard).toStrictEqual(
        creditCardBankResult.illegalCard
      );
    });

    it('Should throw error - it is not credit card number', () => {
      expect(() => cardNumberCheck('testing')).toThrow('Invalid card number');
    });
  });

  describe('Luhn algorithm test', () => {
    it('luhnAlgorithm function should be defined', () => {
      expect(luhnAlgorithm).toBeDefined();
    });

    it('Visa card should return true', () => {
      expect(luhnAlgorithm('4242424242424242')).toBeTruthy();
    });

    it('UnionPay card should return true', () => {
      expect(luhnAlgorithm('6200000000000005')).toBeTruthy();
    });

    it('IllegalCard number should return false', () => {
      expect(luhnAlgorithm('601112590139424')).toBeFalsy();
    });
  });
});
