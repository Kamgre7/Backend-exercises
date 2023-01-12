import {
  getMyAge,
  validationAge,
} from '../be-fundamentals/functional-programming/getMyAge';

const currentYear = new Date().getFullYear();

describe('Test getMyAge function', () => {
  it('function getMyAge should be defined before use', () => {
    expect(getMyAge).toBeDefined();
  });

  it('Return current age of user', () => {
    expect(getMyAge(2010)).toBe(13);
  });

  it('String contain a birthday year', () => {
    expect(new Date(1990, 1, 1).toString()).toMatch(/\d{4}/g);
  });

  it('Should return error - user birthday year cannot be greater than current year', () => {
    expect(() => validationAge(2050, currentYear)).toThrow(
      'Invalid year of birth'
    );
  });
});
