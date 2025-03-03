/* eslint-disable import/order */
import { beyondWonderlandFontFace } from './fonts/beyond-wonderland';
import { robotoFontFace } from './fonts/roboto';
import React from 'react';
import CumulativePnl from './CumulativePnl';
import Stats from './StatsAndHistory/StatsView';
import TradeHistory from './StatsAndHistory/TradeHistory';
import EmptyState from './empty';
import UploadAttachments from './Render/upload';

const MemoizedCumulativePnl = React.memo(CumulativePnl);
const MemoizedStats = React.memo(Stats);
const MemoizedTradeHistory = React.memo(TradeHistory);
const MemoizedUploadAttachments = React.memo(UploadAttachments);

const customFonts = [
  {
    name: 'Roboto',
    css: robotoFontFace,
  },
  {
    name: 'Beyond Wonderland',
    css: beyondWonderlandFontFace,
  },
];
export {
  customFonts,
  MemoizedCumulativePnl,
  MemoizedStats,
  MemoizedTradeHistory,
  EmptyState,
  MemoizedUploadAttachments,
};
