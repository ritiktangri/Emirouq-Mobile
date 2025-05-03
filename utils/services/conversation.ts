// Import necessary types and utilities

import { callApi } from '../callApis/apiUtils';
import conversation from '../endpoints/conversation';
import { ApiEndpoint } from '../types';

export const createConversationService = async ({ body }: any) => {
  return callApi({
    uriEndPoint: { ...conversation.createConversation.v1 } as ApiEndpoint,
    body,
  });
};

export const getConversationService = async ({ query, signal }: any) => {
  return callApi({
    uriEndPoint: { ...conversation.getConversation.v1 } as ApiEndpoint,
    query,
    signal,
  });
};
export const sendMessageService = async ({ body, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...conversation.sendMessage.v1 } as ApiEndpoint,
    body,
    pathParams,
  });
};
export const getMessageService = async ({ query, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...conversation.getMessage.v1 } as ApiEndpoint,
    query,
    pathParams,
  });
};
export const uploadFilesService = async ({ body, pathParams }: any) => {
  return callApi({
    uriEndPoint: { ...conversation.uploadFiles.v1 } as ApiEndpoint,
    body,
    pathParams,
    multipart: true,
  });
};
