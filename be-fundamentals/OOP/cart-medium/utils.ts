import { Discounts } from './types';

export const currentDate = (): string =>
  new Date().toLocaleDateString('pl-EU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

export class DataValidation {
  static checkIfNotEqualOrBelowZero(amount: number, inputName: string) {
    if (amount <= 0) {
      throw new Error(`Cannot add item with ${inputName} less or equal zero`);
    }
  }

  static checkIfNotEmptyString(name: string, inputName: string): void {
    const nameTrim = name.trim();

    if (nameTrim.length === 0) {
      throw new Error(`Cannot add item with empty ${inputName}`);
    }
  }

  static checkIfDiscountLessThanValue(discount: Discounts) {
    if (discount >= 1) {
      throw new Error('Discount cannot be 100% or more');
    }
  }
}
