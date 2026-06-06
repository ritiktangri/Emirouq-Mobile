import { callApi } from '../callApis/apiUtils';
import notification from '../endpoints/notification';
import { ApiEndpoint } from '../types';

export const getMyNotificationsService = async ({ query }: any = {}) => {
  return callApi({
    uriEndPoint: { ...notification.getMyNotifications.v1 } as ApiEndpoint,
    query,
  });
};
