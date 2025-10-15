import { describe, it, expect } from 'vitest';
import { isNumber, isString } from '../shared/utils/guards';

describe('Function Overloading', () => {
  it('Example', () => {
    expect(combine(1, 3)).toBe(4);
    expect(combine('dog', 'cat')).toBe('dogcat');
    const combinedFriends = combine(['Bob', 'Sue'], ['Jill', 'Lee']);

    expect(combinedFriends).toEqual(['Bob', 'Sue', 'Jill', 'Lee']);

    const t1 = new Transaction(100);
    const t2 = new Transaction(200);

    const c = combine(t1, t2);
    expect(c.amount).toBe(300);
  });
});

// FunctionOverloading and Type Assertions
// Discriminated Unions
// Schema - data from the outside
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: string[], b: string[]): unknown[];
function combine(a: Transaction, b: Transaction): Transaction;
function combine(a: unknown, b: unknown): unknown {
  // find out if a and b are numbers, are they string, are they arrays, and then use them that way.
  if (isString(a) && isString(b)) {
    return a + b;
  }
  if (isNumber(a) && isNumber(b)) {
    return a + b;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b];
  }
  if (a instanceof Transaction && b instanceof Transaction) {
    return new Transaction(a.amount + b.amount);
  }
  throw new Error('Incompatible Type');
}

class Transaction {
  constructor(public amount: number) {}
}
