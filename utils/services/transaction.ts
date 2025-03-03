// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import transaction from '../endpoints/transaction';
import { ApiEndpoint } from '../types';

export const getTransactionServices = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...transaction.getDetails.v1 } as ApiEndpoint,
    query,
  });
};
