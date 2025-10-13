import { http, delay, HttpResponse } from 'msw';

export const authHandler = [
  http.get('/api/auth/user', async () => {
    await delay();

    // return new HttpResponse({
    //   status: 401,
    // });
    return HttpResponse.json({
      userId: 'Bob Smith',
    });
  }),
];
