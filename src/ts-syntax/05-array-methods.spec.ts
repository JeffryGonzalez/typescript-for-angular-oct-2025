import { describe, it, expect } from 'vitest';
import { NonZeroNumber } from '../shared/utils/types';
import { isEven } from '../shared/utils/math';

describe('Working with Values - Array Methods', () => {
  it('Objects are Mutable', () => {
    const myAccount = new BankAccount();

    const currentAccount = myAccount.makeDeposit(100);
    expect(currentAccount.balance).toBe(100);
    const updatedAccount = currentAccount.makeWithdrawal(800);
    expect(updatedAccount.balance).toBe(-700);
    // expect(myAccount.getBalanc()).toBe(0);

    // myAccount.makeDeposit(300);

    // expect(myAccount.getBalance()).toBe(300);

    // myAccount.makeWithdrawal(100);

    // expect(myAccount.getBalance()).toBe(200);

    // expect(myAccount.makeDeposit(100)).toBe(undefined);
    const company = 'Progressive';

    const updatedCompany = company.toUpperCase(); // Does not change the company's value, it returns a NEW value that is the company converted to uppercase

    expect(updatedCompany).toBe('PROGRESSIVE');
    expect(company).toBe('Progressive');
  });

  it('Arrays are mutable and it is bad', () => {
    let myFriends = ['Bob', 'Sue', 'Jim'];

    // Map is "Select" in LINQ, C# = it creates an array of equal numbers.
    // myFriends = myFriends.ma

    // myFriends.push('Jack');
    myFriends = [...myFriends, 'Jack'];

    myFriends = ['Jacob', ...myFriends];

    // expect(myFriends).toEqual([]);
  });

  it('Map On Arrays', () => {
    const numbers = [1, 2, 3, 4];
    const doubledNumbers = numbers.map(double);

    expect(numbers).toEqual([1, 2, 3, 4]);
    expect(doubledNumbers).toEqual([2, 4, 6, 8]);

    function double(n: number) {
      return n + n;
    }
  });
  it('Filter', () => {
    const numbers = [1, 2, 3, 4];

    const evens = numbers.filter(isEven);
    expect(evens).toEqual([2, 4]);
  });
  it('forEach', () => {
    // go through an array and do something with each on of them.
    const numbers = [1, 2, 3, 4];

    numbers.forEach(logIt);

    function logIt(x: number) {
      console.log(x);
    }
  });
  it('reduce', () => {
    // go through an array and do something with each on of them.

    const numbers = [1, 2, 3, 4];

    const total = numbers.reduce((a, b) => a + b);

    expect(total).toBe(10);
  });

  it('reduce example', () => {
    // Given a night of bowling with the Gonzalez family...
    const bowlingScores = [
      { player: 'Jeff', score: 100 },
      { player: 'Stacey', score: 187 },
      { player: 'Henry', score: 133 },
      { player: 'Violet', score: 133 },
    ];

    // We want to derive from this a "GameResults" object that contains the winners, high score, losers, and low score.
    type GameResults = {
      winners: string[];
      highScore: number;
      lowScore: number;
      losers: string[];
    };

    // We create an initial value for the accumulator of the reduce function - there are no winners or losers yet, and the high score is the lowest possible, and the low score is the highest possible.
    const initialResults: GameResults = {
      winners: [],
      highScore: -1, // The high score in bowling is 300.
      lowScore: 301, // The low score in bowling is 0.
      losers: [],
    };

    const results = bowlingScores.reduce((acc, curr) => {
      // We have a new high score! - or a tie.
      if (curr.score > acc.highScore) {
        acc.highScore = curr.score;
        acc.winners = [curr.player];
      } else if (curr.score === acc.highScore) {
        // if it is a tie, just add the player to the list of winners.
        acc.winners.push(curr.player);
      }

      // We have a new low score! - or a tie.
      if (curr.score < acc.lowScore) {
        acc.lowScore = curr.score;
        acc.losers = [curr.player];
      } else if (curr.score === acc.lowScore) {
        // if they are tied, just add the player to the list of losers.
        acc.losers.push(curr.player);
      }

      return acc;
    }, initialResults);

    expect(results.winners).toEqual(['Stacey']);
    expect(results.highScore).toBe(187);
    expect(results.losers).toEqual(['Jeff']);
    expect(results.lowScore).toBe(100);
  });
});

class BankAccount {
  balance = 0;

  makeDeposit(amount: number) {
    const newAccount = new BankAccount();
    newAccount.balance = this.balance + amount;
    return newAccount;
  }
  makeWithdrawal(amount: number) {
    const newAccount = new BankAccount();
    newAccount.balance = this.balance - amount;
    return newAccount;
  }
}
