/* eslint-disable prefer-const */
import { describe, it, expect } from 'vitest';

describe('the basic types practice', () => {
  it('the practice', () => {
    let customerName: string;
    let age: number | 'old';
    let pizza: {
      size: 'small' | 'medium' | 'large';
      toppings: ('cheese' | 'onions' | 'sausage' | 'bacon' | 'green-peppers')[]; //Array<('cheese' | 'onions' | 'sausage' | 'bacon' | 'green-peppers')> // string[]
    };

    customerName = 'Carlos';
    expect(customerName).toBe('Carlos');

    age = 22;
    expect(age).toBe(22);

    age = 'old';
    expect(age).toBe('old');

    expect(customerName).toBe('Carlos');

    // a pizza can be 'small', 'medium', or 'large'.
    // Toppings can include 'cheese' or 'onion', 'sausage', 'bacon', or 'green-peppers'
    pizza = {
      size: 'large',
      toppings: ['cheese', 'onions', 'cheese'],
    };

    expect(pizza).toEqual({
      size: 'large',
      toppings: ['cheese', 'onions'],
    });
  });
});
