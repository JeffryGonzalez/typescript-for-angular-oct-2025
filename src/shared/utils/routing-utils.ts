import { Href, TlsHref } from './types';

export function createExternalRoute(href: TlsHref, label: string) {
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return `<a href=${href} target="_blank">${label}</a>`;
  } else {
    throw new Error('Links must be hyperlinks with http or https..');
  }
}
