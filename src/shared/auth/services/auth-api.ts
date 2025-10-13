import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class AuthApi {
  #client = inject(HttpClient);

  getUser() {
    // fake classroom stuff.
    return this.#client.get<{ userId: string }>('/api/auth/user');
  }
}
