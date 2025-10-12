// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import attributes from '../endpoints/attribute';
import { ApiEndpoint } from '../types';

export const getAttributes = async ({ pathParams, query }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.getAttribute.v1 } as ApiEndpoint,
    pathParams,
    query,
  });
};
export const getAttributeOptions = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.getAttributeOptions.v1 } as ApiEndpoint,
    query,
    pathParams,
  });
};
export const getParentAttributeOptions = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...attributes.getParentAttributeOptions.v1 } as ApiEndpoint,
    query,
    pathParams,
  });
};
