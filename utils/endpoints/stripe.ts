import defaults from './defaults';

const prefix = '/stripe';

const stripe = {
  trialPeriodCheckout: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/subscription/trial',
    },
  },
  createCheckoutSession: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/session',
    },
  },
  updateSubscription: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/update/session',
    },
  },
  cancelNextBilling: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/cancel-next-billing',
    },
  },
  getFutureInvoice: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/subscription/future-invoice',
    },
  },
  getPaymentMethodList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/payment-method',
    },
  },
  deletePaymentMethod: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: prefix + '/delete-payment-method/:id',
    },
  },
  changePaymentMethod: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: prefix + '/change-payment-method/:id',
    },
  },
  linkPaymentMethod: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/payment-method',
    },
  },
  getPlans: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v2,
      uri: prefix + '/plan-list',
    },
  },
  fetchPaymentSheet: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/payment-sheet/:planId',
    },
  },
  createSubscription: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: prefix + '/subscription',
    },
  },
  checkSubscription: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/check-subscription/:id',
    },
  },
  isCategorySubscribed: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: prefix + '/is_subscribed/:categoryId',
    },
  },
};

export default stripe;
