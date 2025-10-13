export type ApiLinkItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  added: string;
};

export type SortingOptions = 'NewestFirst' | 'OldestFirst';

export type ApiLinkCreateItem = Pick<
  ApiLinkItem,
  'title' | 'description' | 'link'
>;
