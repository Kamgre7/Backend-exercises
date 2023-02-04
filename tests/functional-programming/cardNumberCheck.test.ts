import { cardNumberCheck } from '../../be-fundamentals/functional-programming/exam/cardNumberCheck';
import { luhnAlgorithm } from '../../be-fundamentals/functional-programming/exam/luhnAlgorithm';

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
      expect(cardNumberCheck(4242424242424242)).toStrictEqual(
        creditCardBankResult.visa
      );
    });

    it('Should return is legal card from discover', () => {
      expect(cardNumberCheck(6011000990139424)).toStrictEqual(
        creditCardBankResult.discover
      );
    });

    it('Should return bank not in database -  UnionPay have no validation regExp', () => {
      expect(cardNumberCheck(6200000000000005)).toStrictEqual(
        creditCardBankResult.unionPay
      );
    });

    it('Should return is illegal card', () => {
      expect(cardNumberCheck(601112590139424)).toStrictEqual(
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
