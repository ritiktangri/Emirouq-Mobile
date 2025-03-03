import { callApi } from '../callApis/apiUtils';
import { trade } from '../endpoints';
import { ApiEndpoint } from '../types';

export const addTrade = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.addTrade.v1 } as ApiEndpoint,
    body,
  });
};
export const cumulativeStatsService = async ({ query, signal }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.cumulativeStats.v1 } as ApiEndpoint,
    query,
    signal,
  });
};
export const timeZoneService = async ({ query }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.timeZone.v1 } as ApiEndpoint,
    query,
  });
};
export const getTrades = async ({ query, signal }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.getTrade.v1 } as ApiEndpoint,
    query,
    signal,
  });
};
export const uploadQuesTradeCsvService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.uploadQuesTradeCsv.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const uploadInteractiveCsvService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.uploadInteractiveCsv.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const mt4CsvUploadService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.mt4CsvUpload.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const webullCsvUploadService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.webullCsvUpload.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const eTradeCsvUploadService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.eTradeCsvUpload.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const mt5CsvUploadService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.mt5CsvUpload.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const ninjaTraderCsvUploadService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.ninjaTraderCsvUpload.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const tc2000CsvUploadService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.tc2000CsvUpload.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const tefsEvolutionCsvUploadService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.tefsEvolutionCsvUpload.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};
export const getSingleTradeService = async ({ pathParams }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.singleTrade.v1 } as ApiEndpoint,
    pathParams,
  });
};
export const existTradeService = async ({ pathParams, query }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.existTrade.v1 } as ApiEndpoint,
    pathParams,
    query,
  });
};
export const deleteTradeService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.deleteTrade.v1 } as ApiEndpoint,
    body,
  });
};
export const tickers = async ({ query }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.tickers.v1 } as ApiEndpoint,
    query,
  });
};
export const addExecutionService = async ({ pathParams, body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.addExecution.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const updateExecutionService = async ({ pathParams, body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.updateExecution.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const deleteExecutionService = async ({ pathParams, body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.deleteExecution.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const addTagsInTradeService = async ({ pathParams, body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.addTags.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const realizedMultipleService = async ({ pathParams, body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.realizedMultiple.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const markAsBreakEvenService = async ({ pathParams, body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...trade.markAsBreakEven.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const addTradeNotesService = async ({ body, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...trade.addNotes.v1 } as ApiEndpoint,
    body,
    pathParams,
    multipart: true,
  });
};
