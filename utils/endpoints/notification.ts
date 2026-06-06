import defaults from './defaults';

const notification = {
  getMyNotifications: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/notifications',
    },
  },
};

export default notification;
