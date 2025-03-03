const calcNumColumns = ({ width, styles, minCols }: any) => {
  const cols = width / styles?.block?.width;
  const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
  const colsMinusMargin = +cols - 2 * +colsFloor * styles?.block?.margin;
  if (colsMinusMargin < colsFloor && colsFloor > minCols) {
    return colsFloor - 1;
  } else return colsFloor;
};

const formatData = (data: any, numColumns: any) => {
  const amountFullRows = Math.floor(data.length / numColumns);
  let amountItemsLastRow = data.length - amountFullRows * numColumns;

  while (amountItemsLastRow !== numColumns && amountItemsLastRow !== 0) {
    data.push({ key: `empty-${amountItemsLastRow}`, empty: true });
    amountItemsLastRow++;
  }
  return data;
};
export { calcNumColumns, formatData };
