// Import necessary types and utilities
import { callApi } from '../callApis/apiUtils';
import { account } from '../endpoints';
import { ApiEndpoint } from '../types';

export const createAccountService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...account.create.v1 } as ApiEndpoint,
    body,
  });
};

export const deleteAccountService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...account.delete.v1 } as ApiEndpoint,
    pathParams,
  });
};

export const updateAccountService = async ({ pathParams, body }: any) => {
  return callApi({
    uriEndPoint: { ...account.update.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
