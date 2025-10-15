import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  ApiLinkCreateItem,
  ApiLinkItem,
  ApiLinkResponse,
  ApiLinksResponseSchema,
} from '../types';
import { catchError, map } from 'rxjs';

export class LinksApi {
  private readonly client = inject(HttpClient);

  getLinks() {
    return this.client
      .get<ApiLinkResponse>('https://api.some-fake-server.com/links')
      .pipe(
        map((r) => {
          // two ways - here's the first - STRICT
          // Throw an error - like blow up if this happens.
          // const data = ApiLinksResponseSchema.parse(r);
          // return data;
          const validationResults = ApiLinksResponseSchema.safeParse(r);
          if (validationResults.success) {
            return validationResults.data;
          } else {
            console.error(validationResults.error);
            return [];
          }
        }),
      );
  }

  addLink(link: ApiLinkCreateItem) {
    return this.client.post<ApiLinkItem>(
      'https://api.some-fake-server.com/links',
      link,
    );
  }
}
