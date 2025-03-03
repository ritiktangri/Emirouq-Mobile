import defaults from './defaults';

const prefix = '/dashboard';

const dashboard = {
  overallStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/overall-stats`,
    },
  },
  tagsStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/tags-stats`,
    },
  },
  cumulativeStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/cumulative-stats`,
    },
  },
  unSeenCount: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/unseen-count`,
    },
  },
  trades: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/trades-stats`,
    },
  },
};

export default dashboard;
