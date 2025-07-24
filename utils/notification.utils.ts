import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice || Device?.deviceName) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      // console.log("existingStatus", existingStatus);
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      // console.log("finalStatus", finalStatus);
      return;
    }

    // Project ID can be found in app.json | app.config.js; extra > eas > projectId
    // token = (await Notifications.getExpoPushTokenAsync({ projectId: "YOUR_PROJECT_ID" })).data;
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })
    ).data;

    // The token should be sent to the server so that it can be used to send push notifications to the device
    // console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      showBadge: true,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FE9018',
    });
  }

  return {
    token,
    device: Device.osName,
    deviceName: Device.deviceName,
    deviceId: Device.osInternalBuildId,
  };
}
