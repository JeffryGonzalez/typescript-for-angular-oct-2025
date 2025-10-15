import * as z from 'zod/v4';

export const ApiLinkItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  link: z.string(),
  added: z.string(),
});

export type ApiLinkItem = z.infer<typeof ApiLinkItemSchema>;

export const ApiLinksResponseSchema = z.array(ApiLinkItemSchema);

export type ApiLinkResponse = z.infer<typeof ApiLinksResponseSchema>;

export type SortingOptions = 'NewestFirst' | 'OldestFirst';

export type ApiLinkCreateItem = Pick<
  ApiLinkItem,
  'title' | 'description' | 'link'
>;
