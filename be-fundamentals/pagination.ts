interface paginationSettings {
  actualPageIdx: number;
  entriesOnPage: number;
}

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const settings = { actualPageIdx: 0, entriesOnPage: 3 };

export const paginateArray = (
  dataEntries: number[],
  settings: paginationSettings
): number[] => {
  const { actualPageIdx, entriesOnPage } = settings;
  //const pagesCount = Math.ceil(dataEntries.length / entriesOnPage);
  const startRange = actualPageIdx * entriesOnPage;
  const endRange = startRange + entriesOnPage;

  return dataEntries.slice(startRange, endRange);
};

console.log(paginateArray(data, settings));
