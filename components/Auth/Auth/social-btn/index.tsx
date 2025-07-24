/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useCallback } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useWamUpBrowser } from '~/hooks/useWarmUpBrowser';
import { useSSO } from '@clerk/clerk-expo';

import * as AuthSession from 'expo-auth-session';

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'emirouq-mobile',
  path: 'oauth-callback',
});
console.log(redirectUri, 'redirectUri');
const SocialButtons = () => {
  useWamUpBrowser();

  const { startSSOFlow } = useSSO();

  const onPress = useCallback(async (strategy: any) => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: redirectUri,
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View className="mx-6">
      <TouchableOpacity
        onPress={() => {
          onPress('oauth_google');
        }}
        className="mb-4 h-12 flex-row items-center justify-center rounded-lg border border-gray-200 bg-white">
        <AntDesign name="google" size={20} color="black" />

        <Text className="ml-2 font-['Inter-Semibold'] text-base text-gray-800">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <TouchableOpacity
          onPress={() => {
            onPress('oauth_apple');
          }}
          className="h-12 flex-row items-center justify-center rounded-lg bg-black">
          <AntDesign name="apple1" size={20} color="white" />
          <Text className="ml-2 font-['Inter-Semibold'] text-base text-white">
            Continue with Apple
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SocialButtons;
