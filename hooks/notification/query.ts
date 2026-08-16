import { useQuery } from '@tanstack/react-query';

import {
  getMyNotificationsService,
  getUnreadNotificationCountService,
} from '~/utils/services/notification';

export const useGetMyNotifications = (
  userId: any,
  params: { start?: number; limit?: number; unreadOnly?: boolean } = {}
) =>
  useQuery({
    queryKey: [
      'my-notifications',
      userId,
      params?.start ?? 0,
      params?.limit ?? 20,
      params?.unreadOnly ?? false,
    ],
    queryFn: () =>
      getMyNotificationsService({
        query: {
          start: params?.start ?? 0,
          limit: params?.limit ?? 20,
          unreadOnly: params?.unreadOnly ?? false,
        },
      }),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

export const useGetUnreadNotificationCount = (userId: any) =>
  useQuery({
    queryKey: ['unread-notification-count', userId],
    queryFn: () => getUnreadNotificationCountService(),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });
