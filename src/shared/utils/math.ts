import { NonZeroNumber } from './types'; // talk about import type.

// in C# something has to be "public" to use it.
// JavaScript/TypeScript uses "export"
export function divide<T extends number>(a: number, b: NonZeroNumber<T>) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}
