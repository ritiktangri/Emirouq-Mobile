import defaults from './defaults';

const notification = {
  getMyNotifications: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/notifications',
    },
  },
  getUnreadCount: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: '/notifications/unread-count',
    },
  },
  markAsRead: {
    v1: {
      ...defaults.methods.PATCH,
      ...defaults.versions.v1,
      uri: '/notifications/:id/read',
    },
  },
};

export default notification;
