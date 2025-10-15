import { http, delay, HttpResponse } from 'msw';
import { pluck } from '../shared/utils/pluck';

type FullApiCustomer = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

const CUSTOMER_LIST: FullApiCustomer[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  },
  {
    id: '2',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
  },
  {
    id: '3',
    fullName: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-555-5555',
  },
];

export const customersHandler = [
  http.get('/api/customers', async () => {
    await delay();
    const summary = CUSTOMER_LIST.map((customer) =>
      pluck(customer, 'id', 'fullName'),
    );
    return HttpResponse.json(summary);
  }),
  http.get('/api/customers/:id', async (req) => {
    await delay();
    const { id } = req.params;
    const customer = CUSTOMER_LIST.find((c) => c.id === id);
    if (customer) {
      return HttpResponse.json(customer);
    } else {
      return new HttpResponse({
        status: 404,
        statusText: 'Not Found',
        body: { message: `Customer with id ${id} not found` },
      });
    }
  }),
];
