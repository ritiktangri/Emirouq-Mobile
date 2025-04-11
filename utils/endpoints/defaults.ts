import { Method } from 'axios';

const defaults = {
  methods: {
    GET: {
      method: 'GET' as Method,
    },
    POST: {
      method: 'POST' as Method,
    },
    PUT: {
      method: 'PUT' as Method,
    },
    DELETE: {
      method: 'DELETE' as Method,
    },
  },
  versions: {
    v1: {
      version: '/api',
    },
    v2: {
      version: '/admin/api',
    },
    weatherV25: {
      version: '/data/2.5',
    },
  },
};

export default defaults;
