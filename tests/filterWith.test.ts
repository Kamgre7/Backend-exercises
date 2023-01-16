import {
  checkPhrase,
  filterWith,
} from '../be-fundamentals/functional-programming/filterWith';

const data = [
  {
    name: 'Cummings Baxter',
    tags: ['labore', 'nisi'],
  },
  {
    name: 'Madelyn Dickson',
    tags: ['nisi', 'officia', 'ex', 'non', 'pariatur'],
  },
  {
    name: 'Mcguire Mercado',
    tags: ['esse', 'deserunt'],
  },
  {
    name: 'Marina Porter',
    tags: ['laborum', 'aliquip', 'sit'],
  },
];

const result = [
  {
    name: 'Cummings Baxter',
    tags: ['labore', 'nisi'],
  },
  {
    name: 'Madelyn Dickson',
    tags: ['nisi', 'officia', 'ex', 'non', 'pariatur'],
  },
];

const phraseRegExp = new RegExp('nisi', 'gi');

describe('Test FilterWith function', () => {
  it('FilterWith function should be defined', () => {
    expect(filterWith).toBeDefined();
  });

  it('Should return result variable ', () => {
    expect(filterWith(data, 'nisi')).toStrictEqual(result);
  });

  it('Should return false - "nisi" phrase is not in sentence', () => {
    expect(checkPhrase('Cummings Baxter', phraseRegExp)).toBeFalsy();
  });

  it('Should return true - "nisi" phrase is in sentence', () => {
    expect(checkPhrase('Cummings Baxternisi', phraseRegExp)).toBeTruthy();
  });
});
