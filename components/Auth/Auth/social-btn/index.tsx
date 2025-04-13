/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useWamUpBrowser } from '~/hooks/useWarmUpBrowser';
import { useAuth as ClerkUseAuth, useOAuth, useUser } from '@clerk/clerk-expo';
import { useOAuthLogin } from '~/hooks/auth/mutation';
import { setStorageItemAsync } from '~/hooks/useStorageState';
import { useAuth } from '~/context/AuthContext';
import { useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';

const SocialButtons = () => {
  useWamUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { signOut, isSignedIn, isLoaded, userId } = ClerkUseAuth();
  const { showToast } = useTheme();
  const { getUser } = useAuth();
  const router = useRouter();
  const { user } = useUser();
  const oAuthLogin = useOAuthLogin();
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive }: any = await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);
  useEffect(() => {
    if (userId) {
      const payload = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImage: user?.imageUrl,
        oauthId: 'google',
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
  }, [userId]);

  return (
    <View className="">
      <TouchableOpacity
        onPress={onPress}
        className="mb-4 h-12 flex-row items-center justify-center rounded-lg border border-gray-200 bg-white">
        {oAuthLogin.isPending ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <AntDesign name="google" size={20} color="black" />
        )}

        <Text className="ml-2 font-['Inter-Semibold'] text-base text-gray-800">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && (
        <TouchableOpacity className="h-12 flex-row items-center justify-center rounded-lg bg-black">
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
