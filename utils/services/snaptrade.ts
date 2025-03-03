// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { snaptrade } from '../endpoints';
import { ApiEndpoint } from '../types';

export const getAvailableBrokers = async () => {
  return callApi({
    uriEndPoint: { ...snaptrade.getAvailableBrokers.v1 } as ApiEndpoint,
  });
};

export const getSnapBrokerAccounts = async (body: any) => {
  return callApi({
    uriEndPoint: { ...snaptrade.getSnapBrokerAccounts.v1 } as ApiEndpoint,
    body,
  });
};

export const snapRedirectCallback = async (body: any) => {
  return callApi({
    uriEndPoint: { ...snaptrade.snapRedirectCallback.v1 } as ApiEndpoint,
    body,
  });
};
