import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiLinkCreateItem, ApiLinkItem } from '../types';

export class LinksApi {
  private readonly client = inject(HttpClient);

  getLinks() {
    return this.client.get<ApiLinkItem[]>(
      'https://api.some-fake-server.com/links',
    );
  }

  addLink(link: ApiLinkCreateItem) {
    return this.client.post<ApiLinkItem>(
      'https://api.some-fake-server.com/links',
      link,
    );
  }
}
