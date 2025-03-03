// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { dashboard } from '../endpoints';
import { ApiEndpoint } from '../types';

export const getOverallStatsService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...dashboard.overallStats.v1 } as ApiEndpoint,
    query,
  });
};
export const unSeenCountService = async () => {
  return callApi({
    uriEndPoint: { ...dashboard.unSeenCount.v1 } as ApiEndpoint,
  });
};
export const tagsStatsService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...dashboard.tagsStats.v1 } as ApiEndpoint,
    query,
  });
};
export const dashboardTradesService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...dashboard.trades.v1 } as ApiEndpoint,
    query,
  });
};
