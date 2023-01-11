export type paginationSettings = {
  actualPageIdx: number;
  entriesOnPage: number;
};

export type pageInfo = {
  pagesCount: number;
  actualPageIdx: number;
  entriesOnPage: number;
  allElementsCount: number;
};

export const validateCurrentPage = (pageInformation: pageInfo) => {
  const { actualPageIdx, pagesCount } = pageInformation;

  if (pagesCount < actualPageIdx) {
    throw new Error(`Last page is ${pagesCount}!`);
  }
};

export const validatePageNumber = (pageInformation: pageInfo) => {
  const { actualPageIdx } = pageInformation;

  if (actualPageIdx < 0) {
    throw new Error(`Page must be grater or equal 0`);
  }
};

export const pageCounterIsInteger = (pageInformation: pageInfo) => {
  const { actualPageIdx, entriesOnPage } = pageInformation;

  if (!(Number.isInteger(actualPageIdx) || Number.isInteger(entriesOnPage))) {
    throw new Error(`Must be integer `);
  }
};

export const checkElementsOnPage = (pageInformation: pageInfo) => {
  const { entriesOnPage, allElementsCount } = pageInformation;

  if (entriesOnPage > allElementsCount) {
    throw new Error(
      `Cannot be more elements on page than ${allElementsCount} `
    );
  }
};

const validatePagination = (pageInformation: pageInfo) => {
  validateCurrentPage(pageInformation);
  validatePageNumber(pageInformation);
  pageCounterIsInteger(pageInformation);
  checkElementsOnPage(pageInformation);
};

export const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
export const settings: paginationSettings = {
  actualPageIdx: 1,
  entriesOnPage: 3,
};

export const paginateArray = (
  dataEntries: number[],
  settings: paginationSettings
): number[] => {
  const { actualPageIdx, entriesOnPage } = settings;
  const pagesCount = Math.ceil(dataEntries.length / entriesOnPage);
  const startRange = actualPageIdx * entriesOnPage;
  const endRange = startRange + entriesOnPage;

  validatePagination({
    pagesCount,
    actualPageIdx,
    entriesOnPage,
    allElementsCount: dataEntries.length,
  });

  return dataEntries.slice(startRange, endRange);
};

paginateArray(data, settings);
