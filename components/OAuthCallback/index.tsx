/* eslint-disable import/order */
import { useEffect, useRef, useState } from 'react';
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const didSyncRef = useRef(false);
  const { showToast } = useTheme();
  const { getUser } = useAuth();
  const { user }: any = useUser();
  const oAuthLogin = useOAuthLogin();
  useEffect(() => {
    if (!user) {
      return;
    }

    if (didSyncRef.current) {
      return;
    }
    didSyncRef.current = true;

    setLoading(true);
    setErrorMessage(null);

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
          console.error('[Clerk OAuth callback] backend login failed', err);
          setErrorMessage(err?.message || 'Login failed');
          showToast(err?.message || 'Login failed', 'error');
          signOut();
          setLoading(false);
        });
    } else {
      console.error('[Clerk OAuth callback] user missing primary email', user);
          setErrorMessage('Clerk did not return an email address for this account.');
          setLoading(false);
        }
  }, [user, getUser, oAuthLogin, router, signOut, showToast]);

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
      {errorMessage ? (
        <Text className="mt-3 px-6 text-center text-sm text-red-500">
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}
