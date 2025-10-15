import { signal } from '@angular/core';

export class CustomerData {
  #baseUrl = 'api/customers';

  async list() {
    return await fetch(this.#baseUrl)
      .then(
        (res) => res.json() as unknown as { id: string; fullName: string }[],
      )
      .then((data) => signal(data));
  }

  async getCustomer(id: string) {
    return await fetch(`${this.#baseUrl}/${id}`).then(
      (res) =>
        res.json() as unknown as {
          id: string;
          fullName: string;
          email: string;
          phone: string;
        },
    );
  }
}
