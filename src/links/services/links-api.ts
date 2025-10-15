import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { failed, Results, succeeded } from '../../shared/utils/results';
import {
  ApiLinkCreateItem,
  ApiLinkItem,
  ApiLinkResponse,
  ApiLinksResponseSchema,
} from '../types';

export class LinksApi {
  private readonly client = inject(HttpClient);

  getLinks(): Observable<Results<ApiLinkResponse, { error: string }>> {
    return this.client
      .get<ApiLinkResponse>('https://api.some-fake-server.com/links')
      .pipe(
        map((r) => {
          const validationResults = ApiLinksResponseSchema.safeParse(r);
          if (validationResults.success) {
            return succeeded(validationResults.data);
          } else {
            // send a notification to the support people, whatever
            console.error(validationResults.error);
            return failed({
              error:
                'There were problems with the API - Sorry - Not my issue, but we are working on it',
            });
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
