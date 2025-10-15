import { Brand } from '../shared/utils/brands';
import { none, Option, some } from '../shared/utils/options';
import { failed, Results, succeeded } from '../shared/utils/results';

type CustomerId = Brand<string, 'Customer-Id'>;
type Customer = {
  id: CustomerId;
  name: string;
  age: number;
};

export function getCustomerById(id: string): Option<Customer> {
  // fake code - write the real thing
  if (id === '1') {
    return some({
      id: id as CustomerId,
      name: 'Bob',
      age: 53,
    });
  } else {
    return none;
  }
}

export function deactivateCustomer(id: CustomerId): Results<string, string> {
  if (id !== '1') {
    return failed('That didn not work');
  } else {
    return succeeded('All Good');
  }
}
