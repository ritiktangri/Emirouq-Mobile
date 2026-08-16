import { callApi } from '../callApis/apiUtils';
import notification from '../endpoints/notification';
import { ApiEndpoint } from '../types';

export const getMyNotificationsService = async ({ query }: any = {}) => {
  return callApi({
    uriEndPoint: { ...notification.getMyNotifications.v1 } as ApiEndpoint,
    query,
  });
};

export const getUnreadNotificationCountService = async () => {
  return callApi({
    uriEndPoint: { ...notification.getUnreadCount.v1 } as ApiEndpoint,
  });
};

export const markNotificationReadService = async ({ id }: { id: string }) => {
  return callApi({
    uriEndPoint: { ...notification.markAsRead.v1 } as ApiEndpoint,
    pathParams: { id },
  });
};
