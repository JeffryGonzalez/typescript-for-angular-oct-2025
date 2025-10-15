import { describe, it, expect } from 'vitest';
import { assertNever } from '../shared/utils/assert-never';

describe('Discrimated Unions', () => {
  it('example', () => {
    const folks: Worker[] = [
      {
        kind: 'employee',
        name: 'Joe',
        email: 'joe@aol.com',
        phone: '333',
        salary: 120_000,
      },
      {
        kind: 'retiree',
        name: 'Sue',
        email: 'sue@aol.com',
        phone: '3334',
        pension: 80_000,
      },
    ];

    const totalPay = folks.reduce((current: number, next: Worker) => {
      return current + getPayFor(next);
    }, 0);

    expect(totalPay).toBe(200000);
  });
});

// Kind of an Abstract Type
type Person = {
  name: string;
  phone: string;
  email: string;
};

type Employee = Person & {
  kind: 'employee';
  salary: number;
};

type Retiree = Person & {
  kind: 'retiree';
  pension: number;
};

type Contractor = Person & {
  kind: 'contractor';
  hourlyRate: number;
  hoursWorked: number;
};

type Intern = Person & {
  kind: 'intern';
  stipend: number;
};

type BoardMember = Person & {
  kind: 'board';
  honorarium: 80;
};

type Worker = Employee | Retiree | Contractor | Intern | BoardMember;

function getPayFor(who: Worker): number {
  switch (who.kind) {
    case 'employee':
      return who.salary;
    case 'retiree':
      return who.pension;
    case 'contractor':
      return who.hourlyRate * who.hourlyRate;
    case 'intern':
      return who.stipend;
    case 'board':
      return who.honorarium;
    default:
      assertNever(who);
  }
}
