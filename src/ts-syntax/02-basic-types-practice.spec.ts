/* eslint-disable prefer-const */
import { describe, it, expect } from 'vitest';
import { PositiveInteger } from '../shared/utils/types';

describe('the basic types practice', () => {
  it('the practice', () => {
    let customerName: string;
    let age: number;
    let pizza: {
      size: 'small' | 'medium' | 'large';
      toppings: ('cheese' | 'onions' | 'sausage' | 'bacon' | 'green-peppers')[]; //Array<('cheese' | 'onions' | 'sausage' | 'bacon' | 'green-peppers')> // string[]
    };

    customerName = 'Carlos';
    expect(customerName).toBe('Carlos');

    age = 22;
    expect(age).toBe(22);

    expect(customerName).toBe('Carlos');

    // a pizza can be 'small', 'medium', or 'large'.
    // Toppings can include 'cheese' or 'onion', 'sausage', 'bacon', or 'green-peppers'
    pizza = {
      size: 'large',
      toppings: ['cheese', 'onions'],
    };

    expect(pizza).toEqual({
      size: 'large',
      toppings: ['cheese', 'onions'],
    });
  });

  it('Template Literal Types', () => {
    // This is "advanced" stuff - but just showing it to show the flexibility of the TypeScript language.
    // I want a type that is a number (64 bit floating number) (-18, -18.23, 0, 3789893993787.38899898)
    // but is an integer, that is greater than zero.

    // str
    // T - type parameter, extends means it has to be a kind of "number" This is a generic that will work with any type that is a number
    // strings can be delimeted with single quote, double quotes, or back ticks.
    // backticks have special power - 1) they can be multiline

    function getAge<T extends number>(age: PositiveInteger<T>) {
      return age;
    }

    getAge(33);
    // @ts-expect-error 'doesn't allow negatives'
    getAge(-3);
    // @ts-expect-error 'does not allow zero'
    getAge(0);

    const pay = 123.83;
    const job = 'Developer';

    const summary = `The job is ${job} and the pay is ${pay}`;
    expect(summary).toBe('The job is Developer and the pay is 123.83');

    // "ternary" operator in programming.

    // let score: string;
    // if (pay > 100) {
    //   score = 'High Pay';
    // } else {
    //   score = 'Low Pay';
    // }
    //          condition ?  if true return this | if false, return this
    let score = pay > 100 ? 'High Pay' : 'Low Pay';
    expect(score).toBe('High Pay');
  });
});
