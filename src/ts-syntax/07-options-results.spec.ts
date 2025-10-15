import { describe, it, expect } from 'vitest';
import { deactivateCustomer, getCustomerById } from './demo';
import { isNone, isSome } from '../shared/utils/options';
import { isSuccess } from '../shared/utils/results';

describe('Using Options or Results', () => {
  it('Options', () => {
    // this is a "pattern" that is us
    // ed in lots of apps, especially frontend stuff.

    const maybeCustomer = getCustomerById('1');

    if (isSome(maybeCustomer)) {
      expect(maybeCustomer.value.name).toBe('Bob');
      expect(maybeCustomer.value.id).toBe('1');
    }
    if (isNone(maybeCustomer)) {
      expect.fail('There should be a customer');
    }
  });
  it('Results is for bombs', () => {
    // use the results pattern if a thing would normally throw an exception
    // and you want to force the calling code to handle it.

    const cust = getCustomerById('1');
    if (isSome(cust)) {
      const results = deactivateCustomer(cust.value.id);
      if (isSuccess(results)) {
        expect(results.value).toBe('All Good');
      } else {
        expect.fail('Should not happen');
      }
    } else {
      expect.fail('blammo');
    }
  });
});
/* when you are using the customer stuff -
you should first get a customer,
and once you have a customer that we've given you, THEN
you can call deactivateCustomer.
*/
