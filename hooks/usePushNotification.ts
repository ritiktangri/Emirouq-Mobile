import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect } from 'react';

import { setStorageItemAsync } from './useStorageState';

import { getNotificationTarget } from '~/utils/notification-routing';
import { registerForPushNotificationsAsync } from '~/utils/notification.utils';
import { saveNotificationToken } from '~/utils/services/user';

export function usePushNotifications(user: any) {
  useEffect(() => {
    if (!user || !user.uuid) {
      return; // No user or user UUID, skip setting up notifications
    }
    let subscription: Notifications.Subscription;
    let responseSubscription: Notifications.Subscription;

    (async () => {
      const notificationDevice: any = await registerForPushNotificationsAsync();
      if (!notificationDevice?.token) {
        return;
      }

      const { token, device, deviceId, deviceName } = notificationDevice;
      if (token) {
        await saveNotificationToken({
          body: { token, device, deviceId, deviceName },
        });
        await setStorageItemAsync('notificationDeviceId', deviceId);
      }

      subscription = Notifications.addNotificationReceivedListener((notification) => {
        // console.log("Notification received:", notification);
      });

      responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
        const notificationData: any = response?.notification?.request?.content?.data || {};
        const target = getNotificationTarget(notificationData);

        if (target) {
          router.push(target as any);
        }
      });
    })();

    return () => {
      subscription?.remove();
      responseSubscription?.remove();
    };
  }, [user?.uuid]);
}
