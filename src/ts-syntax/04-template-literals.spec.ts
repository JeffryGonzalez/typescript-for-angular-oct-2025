/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from 'vitest';
import { divide } from '../shared/utils/math';
import { Href } from '../shared/utils/types';
import { createExternalRoute } from '../shared/utils/routing-utils';
// import { Href } from '../shared/utils/types';

describe('Template Literals and Mapped Types', () => {
  it('Better Version of the NonZero', () => {
    expect(divide(10, 2)).toBe(5);
    // // @ts-expect-error 'Non Zero isn't valid for divisor'
    // divide(10, 0);
  });
  it('Linkies', () => {
    const mySite: Href = 'https://www.hypertheory.com';

    expect(mySite).toBe('https://www.hypertheory.com');

    // const otherSite: Href = 'www.geico.com';

    const linky = createExternalRoute(
      'https://www.progressive.com',
      'Great Insurance',
    );
  });
});
