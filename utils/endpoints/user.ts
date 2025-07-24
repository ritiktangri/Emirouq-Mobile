import defaults from './defaults';

const user = {
  fetchMe: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/me',
    },
  },
  getUserDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/user/:id',
    },
  },
  saveNotificationToken: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/save-notification-token',
    },
  },
  updateProfile: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/updateProfile',
    },
  },
  resetPassword: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: '/user/password/:token',
    },
  },
  getSingleUser: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v2,
      uri: '/user/:id',
    },
  },
};

export default user;
