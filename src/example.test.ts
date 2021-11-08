import { sumPositiveNumbers } from './example';

describe('when the arguments passed are positive numbers', () => {
  test('should return the right answer', () => {
    expect(sumPositiveNumbers(4, 5)).toBe(9);
  });
});

describe('When one of the arguments is a negative number', () => {
  test('should throw an error', () => {
    let error;
    try {
      sumPositiveNumbers(-1, 5);
    } catch (err) {
      error = err as Error;
    }
    expect(error).toBeDefined();
    expect(error?.message).toBe('one of the number is negative.');
  });
});
