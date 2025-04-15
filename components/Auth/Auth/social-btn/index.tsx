/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useWamUpBrowser } from '~/hooks/useWarmUpBrowser';
import { useAuth as ClerkUseAuth, useOAuth, useSSO, useUser } from '@clerk/clerk-expo';
import { useOAuthLogin } from '~/hooks/auth/mutation';
import { setStorageItemAsync } from '~/hooks/useStorageState';
import { useAuth } from '~/context/AuthContext';
import { useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';
import * as AuthSession from 'expo-auth-session';
const SocialButtons = () => {
  useWamUpBrowser();

  const { startSSOFlow } = useSSO();
  const { signOut } = ClerkUseAuth();

  const { showToast } = useTheme();
  const { getUser } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const oAuthLogin = useOAuthLogin();
  const onPress = React.useCallback(async (strategy: any) => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        // Defaults to current path
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);
  useEffect(() => {
    if (user?.firstName) {
      const payload = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImage: user?.imageUrl,
        oauthId: user?.primaryEmailAddress?.verification?.strategy,
      };
      oAuthLogin
        .mutateAsync({
          body: payload,
        })
        .then(async (res: any) => {
          await setStorageItemAsync('accessToken', res?.accessToken);
          getUser(() => {
            router.replace(routes.tabs.home as any);
            showToast('Login successful', 'success');
          });
        })
        .catch((err) => {
          showToast(err?.message, 'error');
          signOut();
        });
    }
  }, [user?.firstName]);

  return (
    <View className="">
      <TouchableOpacity
        onPress={() => {
          onPress('oauth_google');
        }}
        className="mb-4 h-12 flex-row items-center justify-center rounded-lg border border-gray-200 bg-white">
        {oAuthLogin?.isPending && oAuthLogin?.variables?.body?.oauthId === 'from_oauth_google' ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <AntDesign name="google" size={20} color="black" />
        )}

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
          {oAuthLogin?.isPending && oAuthLogin?.variables?.body?.oauthId === 'from_oauth_apple' ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <AntDesign name="apple1" size={20} color="white" />
          )}
          <Text className="ml-2 font-['Inter-Semibold'] text-base text-white">
            Continue with Apple
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SocialButtons;
