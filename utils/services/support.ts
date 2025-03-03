// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { support } from '../endpoints';
import { ApiEndpoint } from '../types';

export const createSupportTicketService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...support.createSupportTicket.v1 } as ApiEndpoint,
    body,
    multipart: true,
  });
};

export const createActivityService = async ({ pathParams, body }: any) => {
  return callApi({
    uriEndPoint: { ...support.createActivity.v1 } as ApiEndpoint,
    pathParams,
    body,
    multipart: true,
  });
};

export const getSupportTickerService = async ({ query, signal }: any) => {
  return callApi({
    uriEndPoint: { ...support.getSupportTicker.v1 } as ApiEndpoint,
    query,
    signal,
  });
};

export const getActivitiesService = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...support.getActivities.v1 } as ApiEndpoint,
    query,
    pathParams,
  });
};

export const deleteSupportTicketService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...support.deleteSupportTicket.v1 } as ApiEndpoint,
    pathParams,
  });
};

export const deleteActivityService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...support.deleteActivity.v1 } as ApiEndpoint,
    pathParams,
  });
};

export const closeOpenSupportService = async ({ pathParams, body }: any) => {
  return callApi({
    uriEndPoint: { ...support.closeOpen.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const readTicketService = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...support.readTicket.v1 } as ApiEndpoint,
    pathParams,
  });
};
