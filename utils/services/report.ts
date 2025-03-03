// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { report } from '../endpoints';
import { ApiEndpoint } from '../types';

export const reportSummaryService = async ({ query, signal }: any) => {
  return callApi({
    uriEndPoint: { ...report.summary.v1 } as ApiEndpoint,
    query,
    signal,
  });
};
export const getReportStats = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.getStats.v1 } as ApiEndpoint,
    query,
  });
};
export const getTagsReport = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.getTagsReport.v1 } as ApiEndpoint,
    query,
  });
};

export const dailySectionService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.dailySection.v1 } as ApiEndpoint,
    query,
  });
};
// this api recognize the daily win streak
export const dailyWinStreakService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.dailyWinStreak.v1 } as ApiEndpoint,
    query,
  });
};

// this api recognize the trade win streak
export const tradeWinStreakService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.tradeWinStreak.v1 } as ApiEndpoint,
    query,
  });
};
// this api will return the avg win and lose trade
export const avgWinLoseTradeService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.avgWinLoseTrade.v1 } as ApiEndpoint,
    query,
  });
};
// this api will return the daily reports lime Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
export const dayReportsService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.dayReports.v1 } as ApiEndpoint,
    query,
  });
};
export const weekReportsService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.weekReports.v1 } as ApiEndpoint,
    query,
  });
};
export const monthReportsService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.monthReports.v1 } as ApiEndpoint,
    query,
  });
};
export const priceReportService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.priceReport.v1 } as ApiEndpoint,
    query,
  });
};

export const volumeReportService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.volumeReport.v1 } as ApiEndpoint,
    query,
  });
};

export const instrumentReportService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.instrumentReport.v1 } as ApiEndpoint,
    query,
  });
};

export const rMultipleService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.rMultiple.v1 } as ApiEndpoint,
    query,
  });
};

export const positionSizeService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.positionSize.v1 } as ApiEndpoint,
    query,
  });
};
export const daysTillExpirationService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.daysTillExpiration.v1 } as ApiEndpoint,
    query,
  });
};
export const tagsReportService = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...report.tagsReport.v1 } as ApiEndpoint,
    query,
    pathParams,
  });
};
export const winLossReportService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...report.winLossReport.v1 } as ApiEndpoint,
    query,
  });
};
