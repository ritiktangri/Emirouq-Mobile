import defaults from './defaults';

const prefix = '/conversation';

const conversation = {
  getConversation: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  createConversation: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}`,
    },
  },
  getMessage: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:conversationId/get-message-list`,
    },
  },
  sendMessage: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/:conversationId/send-message/`,
    },
  },
  uploadFiles: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: `${prefix}/:conversationId/upload-files/`,
    },
  },
  getPostConversation: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: `${prefix}/:postId`,
    },
  },
};

export default conversation;
