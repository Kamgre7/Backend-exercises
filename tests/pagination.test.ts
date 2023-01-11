import {
  checkElementsOnPage,
  paginateArray,
  paginationSettings,
  validateCurrentPage,
  validatePageNumber,
} from '../be-fundamentals/functional-programming/pagination';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const settings: paginationSettings = {
  actualPageIdx: 50,
  entriesOnPage: 3,
};

const pageInformation = {
  pagesCount: Math.ceil(data.length / settings.entriesOnPage),
  actualPageIdx: settings.actualPageIdx,
  entriesOnPage: settings.entriesOnPage,
  allElementsCount: data.length,
};

describe('Pagination test', () => {
  it('function pagination should be defined before use', () => {
    expect(paginateArray).toBeDefined();
  });

  it('Result should be [4,5,6]', () => {
    expect(paginateArray(data, settings)).toStrictEqual([4, 5, 6]);
  });

  it('Throw error when pagesCount is lower than actual pageIndex', () => {
    expect(() => validateCurrentPage(pageInformation)).toThrow();
  });

  it('Throw error when actual pageIndex is lower than 0', () => {
    expect(() => validatePageNumber(pageInformation)).toThrow();
  });

  it('Throw error when entriesOnPage is grater than array elements length', () => {
    expect(() => checkElementsOnPage(pageInformation)).toThrow();
  });
});
