const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is passed', () => {
    const obj = {
      name: 'Fabio',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Fabio&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Fabio',
      profession: 'developer',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe(
      'name=Fabio&profession=developer&abilities=JS,TDD',
    );
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Fabio',
      profession: 'developer',
      abilities: { first: 'JS', second: 'TDD' },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should create an object from a valid query string', () => {
    const qs = 'name=Fabio&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Fabio',
      profession: 'developer',
    });
  });

  it('should create an object from a valid query string even if only one key/value pair is passed', () => {
    const qs = 'name=Fabio';

    expect(parse(qs)).toEqual({
      name: 'Fabio',
    });
  });

  it('should create an object from a valid query string even when an array is passed as value', () => {
    const qs = 'name=Fabio&profession=developer&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Fabio',
      profession: 'developer',
      abilities: ['JS', 'TDD'],
    });
  });
});
