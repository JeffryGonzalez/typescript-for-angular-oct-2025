import { computed, Signal } from '@angular/core';

export function fizzBuzz(current: number) {
  if (interpretZeroAsNothing(current)) {
    return '';
  }
  // DRY - don't repeat yourself - RUG - repeat until good.
  if (isFizzBuzz(current)) {
    return 'FizzBuzz';
  }
  if (isFizz(current)) {
    return 'Fizz';
  }
  if (isBuzz(current)) {
    return 'Buzz';
  }
  return '';
}
function interpretZeroAsNothing(current: number) {
  return current === 0;
}

function isBuzz(current: number) {
  return current % 5 === 0;
}

function isFizz(current: number) {
  return current % 3 === 0;
}

function isFizzBuzz(current: number) {
  return isFizz(current) && isBuzz(current);
}

export function fizzBuzzComputed(current: Signal<number>) {
  return computed(() => fizzBuzz(current()));
}
