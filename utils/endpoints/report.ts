import defaults from './defaults';

const prefix = '/report';

const report = {
  summary: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/overall`,
    },
  },
  getStats: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/stats`,
    },
  },
  getTagsReport: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/tags`,
    },
  },
  dailySection: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/daily-section`,
    },
  },
  // this api recognize the daily win streak
  dailyWinStreak: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/daily-win-streak`,
    },
  },
  // this api recognize the trade win streak
  tradeWinStreak: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/trade-win-streak`,
    },
  },
  // this api recognize the avg win and lose trade
  avgWinLoseTrade: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/avg-winning-losing-trade`,
    },
  },
  // this api will return the daily reports lime Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
  dayReports: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/days`,
    },
  },
  // this api will return the weekly reports
  weekReports: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/weeks`,
    },
  },
  // this api will return the monthly reports
  monthReports: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/months`,
    },
  },
  // this api will return the price reports
  priceReport: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/price`,
    },
  },
  // this api will return the volume reports
  volumeReport: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/volume`,
    },
  },
  // this api will return the instrument reports
  instrumentReport: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/instrument`,
    },
  },
  // this api will return the rMultiple
  rMultiple: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/r-multiple`,
    },
  },
  // this api will return the Position Size
  positionSize: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/position-size`,
    },
  },
  // this api will return the days till expiration
  daysTillExpiration: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/dte`,
    },
  },
  // this api will return the tags report
  tagsReport: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/tags-report/:id`,
    },
  },
  // this api will return the win loss report
  winLossReport: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/win-loss-trades/`,
    },
  },
};

export default report;
