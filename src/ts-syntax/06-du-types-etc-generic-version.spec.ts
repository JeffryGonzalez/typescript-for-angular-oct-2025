import { describe, it, expect } from 'vitest';
import { pluck } from '../shared/utils/pluck';

describe('Function Overloading', () => {
  it('Example', () => {
    const first = head([10, 20, 30, 8]);
    expect(first).toBe(10);

    expect(head(['bird', 'apple'])).toBe('bird');
  });

  it('plucking demo', () => {
    const thing = {
      dog: 'Fido,',
      cat: 'Bailey',
      bird: 'Tweety',
    };

    const dogsOnly = pluck(thing, 'dog', 'cat');
  });
});

// FunctionOverloading and Type Assertions
// Discriminated Unions
// Schema - data from the outside
// generics provide "parametric polymorphism"

function head<T>(numbers: T[]): T {
  return numbers[0];
}

// function combine<T extends number>(a: T, b: T): T {
//   return a + b;
// }
