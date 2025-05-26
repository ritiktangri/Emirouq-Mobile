import defaults from './defaults';

const support = {
  createTicket: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: '/support',
    },
  },
  getTickets: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/support',
    },
  },
};

export default support;
