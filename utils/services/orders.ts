// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { order } from '../endpoints';
import { ApiEndpoint } from '../types';

export const createOrder = async ({ body }: { body: any }) => {
  return callApi({
    uriEndPoint: { ...order.createOrder.v1 } as ApiEndpoint,
    body,
  });
};

export const getOrders = async ({ query }: any) => {
  return callApi({
    uriEndPoint: { ...order.getOrders.v1 } as ApiEndpoint,
    query,
  });
};
export const getSingleOrder = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...order.getSingleOrder.v1 } as ApiEndpoint,
    pathParams,
  });
};
export const updateOrderService = async ({ pathParams, body }: any) => {
  return callApi({
    uriEndPoint: { ...order.updateOrder.v1 } as ApiEndpoint,
    pathParams,
    body,
  });
};
export const deleteOrder = async ({ pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...order.deleteOrder.v1 } as ApiEndpoint,
    pathParams,
  });
};
