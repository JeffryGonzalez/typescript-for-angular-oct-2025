export type PositiveInteger<T extends number> = `${T}` extends
  | `-${string}` // -3
  | `${string}.${string}` // 18.23 -> "18.23"
  | '0' // it is zero
  ? never // this is NEVER allowed. It is an invalid type
  : T; // Otherwise, return what they gave me.
