import defaults from './defaults';

const prefix = '/account';

const account = {
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
  update: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
};

export default account;
