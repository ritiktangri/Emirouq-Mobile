// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { broker } from '../endpoints';
import { ApiEndpoint } from '../types';

export const generateSnapLink = async (body: any) => {
  return callApi({
    uriEndPoint: { ...broker.generateSnapLink.v1 } as ApiEndpoint,
    body,
  });
};

export const snapRedirectCallback = async (body: any) => {
  return callApi({
    uriEndPoint: { ...broker.snapRedirectCallback.v1 } as ApiEndpoint,
    body,
  });
};

export const createBrokerService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...broker.create.v1 } as ApiEndpoint,
    body,
  });
};

export const fetchQuesTradeTokens = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...broker.questradeTokenFetch.v1 } as ApiEndpoint,
    body,
  });
};

export const deleteBrokerService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...broker.delete.v1 } as ApiEndpoint,
    pathParams,
  });
};
export const getBrokerListService = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...broker.getList.v1 } as ApiEndpoint,
    query,
  });
};
export const saveTransactionHistory = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...broker.sync_history.v1 } as ApiEndpoint,
    pathParams,
  });
};
export const brokerSyncService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...broker.sync.v1 } as ApiEndpoint,
    pathParams,
  });
};
export const updateTokenService = async ({ pathParams, body }: any) => {
  return callApi({
    uriEndPoint: { ...broker.updateToken.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};

export const connectMetatraderAccount = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...broker.connectMetatraderAccount.v1 } as ApiEndpoint,
    body,
  });
};

export const metatraderHistoricalData = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...broker.metatraderHistoricalData.v1 } as ApiEndpoint,
    pathParams,
  });
};
export const eTradeAuthorizeService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...broker.eTradeAuthorize.v1 } as ApiEndpoint,
    body,
  });
};
