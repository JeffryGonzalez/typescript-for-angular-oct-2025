export type PositiveInteger<T extends number> = `${T}` extends
  | `-${string}` // -3
  | `${string}.${string}` // 18.23 -> "18.23"
  | '0' // it is zero
  ? never // this is NEVER allowed. It is an invalid type
  : T; // Otherwise, return what they gave me.

export type Integer<T extends number> = `${T}` extends
  | `-${string}` // -3
  | `${string}.${string}` // 18.23 -> "18.23"
  ? never
  : T;

export type NonZeroNumber<T extends number> = `${T}` extends '0' ? never : T;

export type Href = `http://${string}` | `https://${string}`;
