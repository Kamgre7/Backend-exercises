import { getMyAge } from '../be-fundamentals/functional-programming/getMyAge';

test('function getMyAge should be defined before use', () => {
  expect(getMyAge).toBeDefined();
});

test('Throw error about wrong birthday year', () => {
  expect(() => getMyAge(2050)).toThrow('Invalid year of birth');
});

test('Return current age of user', () => {
  expect(getMyAge(2010)).toBe(13);
});

test('String contain a birthday year', () => {
  expect(new Date(1990, 1, 1).toString()).toMatch(/\d{4}/g);
});
