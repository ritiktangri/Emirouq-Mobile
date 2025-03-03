import defaults from './defaults';

const prefix = '/historical-data';

const historicalData = {
  getStocksHistoricalData: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/ohlc`,
    },
  },
};

export default historicalData;
