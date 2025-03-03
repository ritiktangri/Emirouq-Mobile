import defaults from './defaults';

const prefix = '/order';

const order = {
  createOrder: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  getOrders: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  getSingleOrder: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  updateOrder: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
  deleteOrder: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/:id`,
    },
  },
};

export default order;
