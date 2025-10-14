export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export function pluck<T, K extends keyof T>(obj: T, ...keys: K[]) {
  return keys.reduce(
    (prev, current) => {
      return {
        ...prev,
        [current]: obj[current],
      };
    },
    {} as Prettify<Pick<T, K>>, //TODO: Show without the Prettify
  );
}
