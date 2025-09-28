/* eslint-disable import/order */
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, ActivityIndicator, BackHandler } from 'react-native';
import { useUser, useAuth as ClerkUseAuth } from '@clerk/clerk-expo';
import { useOAuthLogin } from '~/hooks/auth/mutation';
import { useAuth } from '~/context/AuthContext';
import { useTheme } from '~/context/ThemeContext';
import { setStorageItemAsync } from '~/hooks/useStorageState';
import { routes } from '~/utils/routes';

export default function OAuthCallback() {
  const router = useRouter();
  const { signOut } = ClerkUseAuth();
  const [loading, setLoading] = useState(false);
  const { showToast } = useTheme();
  const { getUser } = useAuth();
  const { user }: any = useUser();
  const oAuthLogin = useOAuthLogin();
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const oauthId = user?.externalAccounts?.[0]?.provider;
      const payload = {
        firstName: user?.firstName,
        lastName: user?.lastName,
        fullName: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImage: user?.imageUrl,
        oauthId,
      };

      oAuthLogin
        .mutateAsync({ body: payload })
        .then(async (res: any) => {
          await setStorageItemAsync('accessToken', res?.accessToken);
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
          showToast(err?.message || 'Login failed', 'error');
          signOut();
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    const backAction = () => {
      if (loading) {
        return true; // Prevent back action
      }
      return false; // Allow back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [loading]);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="black" />
      <Text className="mt-4 text-base text-gray-800">Signing you in...</Text>
    </View>
  );
}
