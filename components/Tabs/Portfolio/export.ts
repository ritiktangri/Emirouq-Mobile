/* eslint-disable import/order */
import SelectPnl from './SelectPnl';
import MetricCards from './MetricCards';
import TickerTape from '../../TradingWidgets/ticker-tape';
import WinPercentChart from './WinPercentChart';
import StatsCards from './StatsCards';
import RealizedPnl from './RealizedPnl';
import Tags from './Tags';
import DailyPnl from './DailyPnl';
import CumulativePnl from './CumulativePnl';
import Trades from './Trades';
import CalendarStats from './CalendarStats';
import React from 'react';
import WeeklyStats from './WeeklyStats';
import { SelectPnl as SelectTags } from '~/components/common/SelectPnl';
// import { MemoizedSelectPnl } from './SelectPnl';
const MemoizedTickerTape = React.memo(TickerTape);
const MemoizedSelectPnl = React.memo(SelectPnl);
const MemoizedMetricCards = React.memo(MetricCards);
const MemoizedWinPercentChart = React.memo(WinPercentChart);
const MemoizedStatsCards = React.memo(StatsCards);
const MemoizedRealizedPnl = React.memo(RealizedPnl);
const MemoizedTrades = React.memo(Trades);
const MemoizedTags = React.memo(Tags);
const MemoizedSelectTags = React.memo(SelectTags);
const MemoizedDailyPnl = React.memo(DailyPnl);
const MemoizedCumulativePnl = React.memo(CumulativePnl);
const MemoizedCalendarStats = React.memo(CalendarStats);
const MemoizedWeeklyStats = React.memo(WeeklyStats);

export {
  MemoizedCalendarStats,
  MemoizedCumulativePnl,
  MemoizedDailyPnl,
  MemoizedTags,
  MemoizedTrades,
  MemoizedRealizedPnl,
  MemoizedStatsCards,
  MemoizedWinPercentChart,
  MemoizedMetricCards,
  MemoizedSelectPnl,
  MemoizedTickerTape,
  MemoizedWeeklyStats,
  MemoizedSelectTags,
};
