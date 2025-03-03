/* eslint-disable import/order */
import React from 'react';
import Filters from './Table/filters';
import MyTable from './Table';
import CumulativePnl from './CumulativePnl';

const MemoizedTradeTable = React.memo(MyTable);
const MemoizedFilters = React.memo(Filters);
const MemoizedCumulativePnl = React.memo(CumulativePnl);

export { MemoizedTradeTable, MemoizedFilters, MemoizedCumulativePnl };
