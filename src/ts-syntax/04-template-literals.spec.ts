/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest';
import { Href, NonZeroNumber } from '../shared/utils/types';

describe('Template Literals and Mapped Types', () => {
  it('Better Version of the NonZero', () => {
    function divide<T extends number>(a: number, b: NonZeroNumber<T>) {
      return a / b;
    }

    expect(divide(10, 2)).toBe(5);

    // @ts-expect-error 'zero not allowed`
    divide(10, 0);
  });
  it('Linkies', () => {
    const mySite: Href = 'https://www.hypertheory.com';

    expect(mySite).toBe('https://www.hypertheory.com');

    // @ts-expect-error 'must start with http or https`
    const otherSite: Href = 'www.geico.com';
  });
});
