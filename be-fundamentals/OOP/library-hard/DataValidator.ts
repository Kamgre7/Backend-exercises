export class DataValidator {
  static checkIfNotEqualOrBelowZero(quantity: number): void {
    if (quantity <= 0) {
      throw new Error(`Quantity cannot be less or equal zero`);
    }
  }

  static checkIfNotEmptyString(name: string, inputName: string): void {
    const nameTrim = name.trim();

    if (nameTrim.length === 0) {
      throw new Error(`${inputName} cannot be empty`);
    }
  }

  static checkIfInteger(value: number): void {
    if (!Number.isInteger(value)) {
      throw new Error(`${value} must be an integer`);
    }
  }
}
