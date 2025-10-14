import { describe, it, expect } from 'vitest';
import * as _ from 'lodash';
import { pluck } from '../shared/utils/pluck';
describe('Using Packages and Stuff', () => {
  it('example', () => {
    type DataINeeed = {
      name: string;
      email: string;
    };
    const dataFromAnApiCall = {
      id: '99',
      name: 'Bob Smith',
      address: {
        state: 'oh',
      },
      history: [], // 1000 things
      email: 'bob@aol.com',
    };

    // const myData: DataINeeed = {
    //   name: dataFromAnApiCall.name,
    //   email: dataFromAnApiCall.email,
    // };
    const myData: DataINeeed = _.pick(dataFromAnApiCall, ['name', 'email']);
    expect(myData).toEqual({
      name: 'Bob Smith',
      email: 'bob@aol.com',
    });
  });
  it('Home Grown', () => {
    const person = {
      id: '11',
      name: 'Bob Smith',
      email: 'bob@compuserve.com',
      age: 53,
      jobs: ['Janitor', 'Teacher'],
      salary: 30000,
    };

    const justParts = pluck(person, 'name', 'age');
    const onlyJobs = pluck(person, 'jobs');

    console.log({ justParts, onlyJobs });
  });
});
