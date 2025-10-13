/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest';

// "Behavior Driven Development" (BDD) - you describe something then make
// imperative statements about it.
describe('Type Annotations', () => {
  it('Let Const', () => {
    const age = 32; // "var" doesn't have "block scope"

    // const creates an immutable binding between a name and a value
    // let creates a mutable binding (you can reassign to it.)
    let message = '';
    if (age > 21) {
      message = 'old enough for a beer';
    }

    expect(message).toBe('old enough for a beer');
  });

  it('some things are inherently not constant', () => {
    const friends = ['Barb', 'Brad', 'Tim'] as const; // "Eventual Typing"

    // friends[0] = 'Nitin';

    // expect(friends[0]).toBe('Nitin');

    const movie = {
      title: 'Episode IV: A New Hope',
      director: 'Lucas',
      yearReleased: 1978,
    } as const;

    // movie = { title: 'Jaws'}
    //  movie.yearReleased = 1977;
  });
  it('strings are weird a bit', () => {
    const book = 'Gone with the Wind';
    type Taco = string | string[] | number;

    let author: Taco = 'Mitchell';

    author = 'Jones';

    author = ['Dog', 'Cat', 'Mouse'];

    author = 55;
    const movie1 = {
      title: 'Episode IV: A New Hope',
      directedBy: 'Lucas',
      yearReleased: 1977,
      cast: ['Mark Hamil', 'Harrison Ford'],
    };

    const movie2 = {
      title: 'Jaws',
      directedBy: 'Spielberg',
      yearReleased: 1977,
    };

    // structural typing - SUPER POWER THAT SHOUDL CHANGE THE WAY YOU WRITE CODE if coming from C# or Java, etc.
    function logMovieInfo(movie: {
      title: string;
      directedBy: string;
      yearReleased: number;
    }) {
      console.log(
        `${movie.title} by ${movie.directedBy} in ${movie.yearReleased}`,
      );
    }

    logMovieInfo(movie1);
    logMovieInfo(movie2);

    const somOtherThing = {
      id: 99,
      title: 'CTO',
      directedBy: 'CEO',
      yearReleased: 1969,
      pay: 180_000,
    };
    logMovieInfo(somOtherThing);
  });

  it('Named Types', () => {
    type Movie = {
      title: string;
      directedBy: string;
      yearReleased: number;
    };
    function logMovieInfo(movie: Movie) {
      console.log(
        `${movie.title} by ${movie.directedBy} in ${movie.yearReleased}`,
      );
    }

    const m2: Movie = {
      title: 'Shadows',
      directedBy: 'Cassavetes',
      yearReleased: 1964,
    };

    logMovieInfo(m2);
  });
});
