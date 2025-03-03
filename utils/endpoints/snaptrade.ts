import defaults from './defaults';

const prefix = '/snaptrade';

const broker = {
  getAvailableBrokers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/available-brokers`,
    },
  },
  generateSnapLink: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/snap-link`,
    },
  },
  getSnapBrokerAccounts: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/list-accounts`,
    },
  },
  snapRedirectCallback: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/login-redirect`,
    },
  },
};

export default broker;
