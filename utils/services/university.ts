// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { university } from '../endpoints';
import { ApiEndpoint } from '../types';

export const getUniversityServices = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...university.getDetails.v1 } as ApiEndpoint,
    query,
  });
};
