// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import { coupon } from '../endpoints';
import { ApiEndpoint } from '../types';

export const applyCouponService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...coupon.applyCoupon.v1 } as ApiEndpoint,
    body,
  });
};
