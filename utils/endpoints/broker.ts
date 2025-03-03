import defaults from './defaults';

const prefix = '/broker';

const broker = {
  generateSnapLink: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/snap-link`,
    },
  },
  snapRedirectCallback: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/login-redirect`,
    },
  },
  create: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  delete: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  getList: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  sync: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/sync/:id`,
    },
  },
  sync_history: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/sync/:id/history`,
    },
  },
  questradeTokenFetch: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/questradeTokenFetch`,
    },
  },
  updateToken: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/update-token/:id`,
    },
  },

  connectMetatraderAccount: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/connect-metatrader-account`,
    },
  },

  metatraderHistoricalData: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/metatrader-historical-data/:id`,
    },
  },
  eTradeAuthorize: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/etrade/authorize`,
    },
  },
};

export default broker;
