/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Platform, ActivityIndicator, Modal } from 'react-native';
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
import { cn } from '~/utils/helper';
const SocialButtons = () => {
  useWamUpBrowser();

  const { startSSOFlow } = useSSO();
  const { signOut } = ClerkUseAuth();
  const [loading, setLoading] = useState(false);
  const { showToast } = useTheme();
  const { getUser } = useAuth();
  const router = useRouter();
  const { user }: any = useUser();
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

  let verifications: any = {
    from_oauth_google: 'google',
    from_oauth_apple: 'apple',
  };

  useEffect(() => {
    if (user?.firstName) {
      const payload = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImage: user?.imageUrl,
        oauthId: verifications?.[user?.primaryEmailAddress?.verification?.strategy],
      };
      setLoading(true);
      oAuthLogin
        .mutateAsync({
          body: payload,
        })
        .then(async (res: any) => {
          await setStorageItemAsync('accessToken', res?.accessToken);
          console.log(res?.newUser, 'res?.newUser');
          getUser(() => {
            if (!res?.newUser) {
              router.replace(routes.tabs.profile?.profile as any);
            } else {
              router.replace(routes.tabs.home as any);
            }
            showToast('Login successful', 'success');
            setLoading(false);
          });
        })
        .catch((err) => {
          if (err.status === 500) {
            showToast('User already exists!', 'error');
          } else {
            showToast(err?.message, 'error');
          }
          signOut();
          setLoading(false);
        });
    }
  }, [user?.firstName]);

  return (
    <View className="mx-6">
      <Modal visible={loading} transparent animationType="fade">
        <View
          className="flex-1 items-center justify-center  bg-opacity-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View className="h-28 w-28 items-center justify-center rounded-xl bg-white">
            <ActivityIndicator size="large" color="#000" />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          onPress('oauth_google');
        }}
        className="mb-4 h-12 flex-row items-center justify-center rounded-lg border border-gray-200 bg-white">
        {/* {loading && oAuthLogin?.variables?.body?.oauthId === 'google' ? (
          <ActivityIndicator size="small" color="#000" />
        ) : ( */}
        <AntDesign name="google" size={20} color="black" />
        {/* )} */}

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
          {/* {loading && oAuthLogin?.variables?.body?.oauthId === 'apple' ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : ( */}
          <AntDesign name="apple1" size={20} color="white" />
          {/* )} */}
          <Text className="ml-2 font-['Inter-Semibold'] text-base text-white">
            Continue with Apple
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SocialButtons;
