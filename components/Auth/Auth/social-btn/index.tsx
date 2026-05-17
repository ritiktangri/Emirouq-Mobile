/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useWamUpBrowser } from '~/hooks/useWarmUpBrowser';
import { useSSO } from '@clerk/clerk-expo';
import { routes } from '~/utils/routes';

import * as AuthSession from 'expo-auth-session';

const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'emirouq-mobile',
  path: 'oauth-callback',
});

const SocialButtons = () => {
  useWamUpBrowser();
  const router = useRouter();

  const { startSSOFlow } = useSSO();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingStrategy, setLoadingStrategy] = useState<
    'oauth_google' | 'oauth_apple' | null
  >(null);

  const onPress = useCallback(async (strategy: 'oauth_google' | 'oauth_apple') => {
    try {
      setErrorMessage(null);
      setLoadingStrategy(strategy);
      console.log('[Clerk SSO] starting flow', { strategy, redirectUri });

      const result = await startSSOFlow({
        strategy,
        redirectUrl: redirectUri,
      });

      console.log('[Clerk SSO] flow result', result);

      const { createdSessionId, setActive, authSessionResult } = result;

      if (!authSessionResult || authSessionResult.type !== 'success') {
        setErrorMessage(
          `SSO ended with ${authSessionResult?.type ?? 'no result'}. Check Clerk redirect URLs and device logs.`,
        );
        return;
      }

      if (createdSessionId) {
        console.log(createdSessionId, "createdSessionId");

        await setActive?.({ session: createdSessionId });
        router.replace(routes['oauth-callback'] as any);
        return;
      }

      setErrorMessage('Clerk returned no session id after SSO completed.');
    } catch (err) {
      const clerkError =
        err instanceof Error ? err.message : JSON.stringify(err, null, 2);

      console.error('[Clerk SSO] startSSOFlow failed', {
        strategy,
        redirectUri,
        err,
      });
      setErrorMessage(clerkError);
    } finally {
      setLoadingStrategy(null);
    }
  }, [startSSOFlow]);

  return (
    <View className="mx-6">
      <TouchableOpacity
        onPress={() => {
          onPress('oauth_google');
        }}
        disabled={loadingStrategy !== null}
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
          disabled={loadingStrategy !== null}
          className="h-12 flex-row items-center justify-center rounded-lg bg-black">
          <AntDesign name="apple1" size={20} color="white" />
          <Text className="ml-2 font-['Inter-Semibold'] text-base text-white">
            Continue with Apple
          </Text>
        </TouchableOpacity>
      )}

      {errorMessage ? (
        <Text className="mt-3 text-center text-sm text-red-500">
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

export default SocialButtons;
