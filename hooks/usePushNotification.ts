import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
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
      const { token, device, deviceId, deviceName }: any =
        await registerForPushNotificationsAsync();
      if (token) {
        await saveNotificationToken({
          body: { token, device, deviceId, deviceName },
        });
      }

      subscription = Notifications.addNotificationReceivedListener((notification) => {
        // console.log("Notification received:", notification);
      });

      responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log("Notification tapped:", response);
      });
    })();

    return () => {
      subscription?.remove();
      responseSubscription?.remove();
    };
  }, [user?.uuid]);
}
