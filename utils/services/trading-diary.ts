// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import tradingDiary from '../endpoints/trading-diary';
import { ApiEndpoint } from '../types';

export const getTradesService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...tradingDiary.getTrades.v1 } as ApiEndpoint,
    query,
  });
};
export const addTradingDiaryNotes = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...tradingDiary.addNotes.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
