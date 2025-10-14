import { describe, it, expect } from 'vitest';

describe('Some Basic Function Stuff', () => {
  it('declarations', () => {
    // using the function keyword
    expect(add(33, 4)).toBe(37);
    expect(add(33)).toBe(33);

    type MathOp = (a: number, b: number) => number;

    function add(a: number, c = 0) {
      return a + c;
    }

    const subtract = (a: number, b: number): number => a - b;

    const mult: MathOp = (a, b) => a * b;

    expect(mult(3, 3)).toBe(9);

    expect(subtract(10, 5)).toBe(5);

    // "Higher Order Function" - a function that takes as an argument a function and/or returns a function
    function doubleItAndApply(num: number, op: MathOp) {
      const doubled = num + num;
      return op(doubled, doubled);
    }

    expect(doubleItAndApply(5, mult)).toBe(100);
    expect(doubleItAndApply(3, add)).toBe(12);

    function poorTagMaker(tag: string, content: string) {
      return `<${tag}>${content}</${tag}>`;
    }

    function tagMaker(tag: string) {
      // closure -
      return (content: string) => {
        return `<${tag}>${content}</${tag}>`;
      };
    }

    const h1Maker = tagMaker('h1');

    expect(poorTagMaker('h1', 'Hello')).toBe('<h1>Hello</h1>');
    expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
    expect(h1Maker('Goodbye')).toBe('<h1>Goodbye</h1>');

    const pMaker = tagMaker('p');

    expect(pMaker('Message')).toBe('<p>Message</p>');

    const h2Maker = new HtmlTagMaker('h2');

    expect(h2Maker.make('Subheading')).toBe('<h2>Subheading</h2>');
  });

  it('destructuring and destructuring arguments', () => {
    type Movie = {
      id: string;
      title: string;
      director: string;
      yearReleased: number;
    };
    function lookupMovieById(id: string): Movie {
      // fake code to go lookup a movie
      return {
        id: id,
        title: 'Star Wars',
        director: 'Lucas',
        yearReleased: 1977,
      };
    }

    // destructuring = return me the movie, but create new variables called title and director from that movie in this scope.
    const { title, director: directedBy } = lookupMovieById('99');
    // const title = sw.title; // I just want the title, and director
    // const director = sw.director;
    expect(title).toBe('Star Wars');
    expect(directedBy).toBe('Lucas');

    const favoriteNumbers = [42, 1969, 4, 20]; // April 20, 1969 - Add this to your calendar.

    const [first, , third] = favoriteNumbers;
    // const first = favoriteNumbers[0];
    // const third = favoriteNumbers[2];
    expect(first).toBe(42);
    expect(third).toBe(4);

    // function buyTicketsToMovie(
    //   numberOfTickets: number,
    //   movie: Pick<Movie, 'title' | 'director'>,
    // ) {
    //   return `Bought ${numberOfTickets} for ${movie.title} by ${movie.director}`;
    // }

    // "Monadic functions" - a common thing in typescript
    function buyTicketsToMovie({
      numberOfTickets,
      show,
    }: {
      numberOfTickets: number;
      show: Pick<Movie, 'title' | 'director'>;
    }) {
      return `Bought ${numberOfTickets} for ${show.title} by ${show.director}`;
    }
    const message = buyTicketsToMovie({
      numberOfTickets: 3,
      show: {
        title: 'Cats',
        director: 'Lewis',
      },
    });
  });

  it('Rest Parameters', () => {
    function add(a: number, b: number, ...rest: number[]) {
      return rest.reduce((l, r) => l + r, a + b);
    }

    expect(add(2, 2)).toBe(4);
    expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
  });
});

class HtmlTagMaker {
  private _tag: string;
  constructor(tag: string) {
    this._tag = tag;
  }

  make(content: string) {
    return `<${this._tag}>${content}</${this._tag}>`;
  }
}
