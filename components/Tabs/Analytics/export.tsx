/* eslint-disable import/order */

import React from 'react';
import StatsCards from './Overview/StatsCards';
import { SelectPnl } from '../../common/SelectPnl';
import TradeDistribution from './Overview/TradeDistribution';
import PerformanceMetrics from './Overview/PerformanceMetrics';
import StreakMetrics from './Overview/StreakMetrics';
import ActivityBreakDown from './Overview/ActivityBreakDown';
import SetUpTags from './Overview/SetUpTags';
import MistakeTags from './Overview/MistakeTags';
import SectionHeading from './Overview/SectionHeading';
import DaysTillExpiration from './DaysTillExpiration';
import RMultiple from './Risk/RMultiple';
import PositionSize from './Risk/PositionSize';
import Tags from './Tags';
import WinLoss from './WinLoss';
import { AnalyticsDistributionSVG } from '~/svgs';
import Days from './DaysWeeksMonth/Days';
import Weeks from './DaysWeeksMonth/Weeks';
import Months from './DaysWeeksMonth/Months';
import Price from './PriceQuantity/Price';
import Quantity from './PriceQuantity/Quantity';
import Instrument from './PriceQuantity/Instrument';
import { OptionSVG, PriceSVG, RiskSVG, TimeFrameSVG, WinLossSVG } from '~/svgs/analytics';
// const Price = React.lazy(() => import('./PriceQuantity/Price'));
// const Quantity = React.lazy(() => import('./PriceQuantity/Quantity'));
// const Instrument = React.lazy(() => import('./PriceQuantity/Instrument'));

const MemoizedSelectPnl = React.memo(SelectPnl);
const MemoizedStatsCards = React.memo(StatsCards);
const MemoizedTradeDistribution = React.memo(TradeDistribution);
const MemoizedPerformanceMetrics = React.memo(PerformanceMetrics);
const MemoizedStreakMetrics = React.memo(StreakMetrics);
const MemoizedActivityBreakDown = React.memo(ActivityBreakDown);
const MemoizedSetUpTags = React.memo(SetUpTags);
const MemoizedMistakeTags = React.memo(MistakeTags);
const MemoizedSectionHeading = React.memo(SectionHeading);
const MemoizedDays = React.memo(Days);
const MemoizedWeeks = React.memo(Weeks);
const MemoizedMonths = React.memo(Months);
const MemoizedPrice = React.memo(Price);
const MemoizedQuantity = React.memo(Quantity);
const MemoizedInstrument = React.memo(Instrument);
const MemoizedDaysTillExpiration = React.memo(DaysTillExpiration);
const MemoizedPositionSize = React.memo(PositionSize);
const MemoizedRMultiple = React.memo(RMultiple);
const MemoizedTags = React.memo(Tags);
const MemoizedWinLoss = React.memo(WinLoss);
const sections = [
  {
    title: 'Overview',
    icon: <AnalyticsDistributionSVG />,
    data: [],
    id: 'overview',
  },
  {
    title: 'Time Frame',
    icon: <TimeFrameSVG width={20} height={20} />,
    data: [
      { label: 'Days', id: 'days' },
      { label: 'Weeks', id: 'weeks' },
      { label: 'Months', id: 'months' },
    ],
    id: 'timeFrame',
  },
  {
    title: 'Price & Quantity',
    icon: <PriceSVG width={20} height={20} />,
    data: [
      { label: 'Price', id: 'price' },
      { label: 'Quantity', id: 'quantity' },
      { label: 'Instrument', id: 'instrument' },
    ],
    id: 'priceQuantity',
  },
  {
    title: 'Options',
    icon: <OptionSVG width={20} height={20} />,
    data: [{ label: 'Days till expiration', id: 'daysTillExpiration' }],
    id: 'options',
  },
  {
    title: 'Risk',
    icon: <RiskSVG width={20} height={20} />,
    data: [
      { label: 'R-Multiple', id: 'rMultiple' },
      { label: 'Position Size', id: 'positionSize' },
    ],
    id: 'risk',
  },
];

export {
  sections,
  MemoizedStatsCards,
  MemoizedSelectPnl,
  MemoizedTradeDistribution,
  MemoizedPerformanceMetrics,
  MemoizedStreakMetrics,
  MemoizedActivityBreakDown,
  MemoizedSetUpTags,
  MemoizedMistakeTags,
  MemoizedSectionHeading,
  MemoizedDays,
  MemoizedMonths,
  MemoizedWeeks,
  MemoizedDaysTillExpiration,
  MemoizedPositionSize,
  MemoizedRMultiple,
  MemoizedTags,
  MemoizedWinLoss,
  MemoizedPrice,
  MemoizedQuantity,
  MemoizedInstrument,
  ActivityBreakDown,
  MistakeTags,
  PerformanceMetrics,
  SetUpTags,
  StreakMetrics,
  TradeDistribution,
  SectionHeading,
};
