import defaults from './defaults';

const trade = {
  timeZone: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/trade/timeZone',
    },
  },
  cumulativeStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `/dashboard/pnl-stats`,
    },
  },
  addTrade: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade',
    },
  },
  getTrade: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/trade',
    },
  },
  uploadQuesTradeCsv: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/ques-trade/csv/upload',
    },
  },
  uploadInteractiveCsv: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/interactiveBroker/csv/upload',
    },
  },
  mt4CsvUpload: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/mt4/csv/upload',
    },
  },
  webullCsvUpload: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/webull/csv/upload',
    },
  },
  eTradeCsvUpload: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/eTrade/csv/upload',
    },
  },
  mt5CsvUpload: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/mt5/csv/upload',
    },
  },
  ninjaTraderCsvUpload: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/ninjaTrader/csv/upload',
    },
  },
  tc2000CsvUpload: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/tc2000/csv/upload',
    },
  },
  tefsEvolutionCsvUpload: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/trade/tefsEvolution/csv/upload',
    },
  },
  deleteTrade: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/trade',
    },
  },
  singleTrade: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/trade/:id',
    },
  },
  existTrade: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/trade/exist/:id',
    },
  },
  tickers: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/polygon/tickers',
    },
  },
  //executions
  addExecution: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/trade/:tradeId/execution',
    },
  },
  deleteExecution: {
    v1: {
      ...defaults.methods.DELETE,
      ...defaults.versions.v1,
      uri: '/trade/:tradeId/execution',
    },
  },
  updateExecution: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/trade/:tradeId/execution/:executionId',
    },
  },
  addTags: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/trade/tags/:tradeId',
    },
  },
  realizedMultiple: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/trade/:tradeId/create/realized-multiple',
    },
  },
  addNotes: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/trade/:tradeId/add-notes',
    },
  },
  markAsBreakEven: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/trade/:tradeId/make-as-break-even',
    },
  },
};

export default trade;
