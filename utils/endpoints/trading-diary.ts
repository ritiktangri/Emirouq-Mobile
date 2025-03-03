import defaults from './defaults';

const prefix = '/trading-diary';

const tradingDiary = {
  getTrades: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  addNotes: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: `${prefix}/notes`,
    },
  },
};

export default tradingDiary;
