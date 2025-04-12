// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import stripe from '../endpoints/stripe';
import { ApiEndpoint } from '../types';

export const trialPeriodCheckout = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.trialPeriodCheckout.v1 } as ApiEndpoint,
  });
};
export const createCheckoutSession = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.createCheckoutSession.v1 } as ApiEndpoint,
    body,
  });
};
export const updateSubscriptionService = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.updateSubscription.v1 } as ApiEndpoint,
    body,
  });
};
export const cancelNextBillingService = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.cancelNextBilling.v1 } as ApiEndpoint,
  });
};
export const getFutureInvoice = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.getFutureInvoice.v1 } as ApiEndpoint,
  });
};
export const getPaymentMethodList = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.getPaymentMethodList.v1 } as ApiEndpoint,
  });
};
export const deletePaymentMethodService = async (id: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.deletePaymentMethod.v1 } as ApiEndpoint,
    pathParams: { id },
  });
};
export const changePaymentMethodService = async (id: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.changePaymentMethod.v1 } as ApiEndpoint,
    pathParams: { id },
  });
};
export const linkPaymentMethod = async (paymentMethodId: string) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.linkPaymentMethod.v1 } as ApiEndpoint,
    body: {
      paymentMethodId,
    },
  });
};

export const getPlansService = async () => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.getPlans.v1 } as ApiEndpoint,
  });
};

export const fetchPaymentSheetService = async (planId: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.fetchPaymentSheet.v1 } as ApiEndpoint,
    pathParams: { planId },
  });
};
export const checkSubscription = async (id: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.checkSubscription.v1 } as ApiEndpoint,
    pathParams: {
      id,
    },
  });
};
export const createSubscription = async ({ body }: any) => {
  // Ensure uriEndPoint conforms to the expected UriEndPoint interface/type
  return callApi({
    uriEndPoint: { ...stripe.createSubscription.v1 } as ApiEndpoint,
    body,
  });
};
