import defaults from './defaults';

const prefix = '/transaction';

const transaction = {
  getDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
};

export default transaction;
