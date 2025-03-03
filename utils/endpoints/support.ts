import defaults from './defaults';

const prefix = '/support';

const support = {
  //post
  createSupportTicket: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  createActivity: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/activity/:supportId`,
    },
  },
  //get
  getSupportTicker: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  getActivities: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/activity/:supportId`,
    },
  },
  //delete
  deleteSupportTicket: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/:supportId`,
    },
  },
  deleteActivity: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: `${prefix}/activity/:activityId`,
    },
  },
  readTicket: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/read/:supportId`,
    },
  },
  closeOpen: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/close-open/:supportId`,
    },
  },
};

export default support;
