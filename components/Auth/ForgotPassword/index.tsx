import { Href, Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/common/Text';
import AuthHeader from '../../UI/AuthHeader';
import Input from '../../UI/Input';

import { useAuth } from '~/context/AuthContext';
import { pwd_background } from '~/image';
import { routes } from '~/utils/routes';
import DynamicButton from '~/components/DynamicButton';
import { useTheme } from '~/context/ThemeContext';

const ForgotPassword = () => {
  const { forgotPassword, forgotLoading } = useAuth();
  const [email, setEmail] = useState('');
  const { isDarkTheme } = useTheme();
  const router = useRouter();
  const forgot = () => {
    forgotPassword(
      {
        body: {
          email,
        },
      },
      () => {
        // toast.success('Otp has been sent successfully to your email');
        router.push(routes.auth.verifyOtp as Href);
        router.setParams({ email });
      }
    );
  };
  return (
    <ImageBackground
      className="flex-1 flex-col bg-white dark:bg-transparent"
      source={isDarkTheme ? pwd_background : ''}>
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 flex-col">
        <AuthHeader />
        <View className="mt-12 flex-col gap-y-6 p-6">
          <Text className="font-poppinsMedium text-3xl font-semibold dark:text-white">
            Forgot Password!
          </Text>
          <Input
            onChangeText={setEmail}
            className="w-full py-4 dark:text-white"
            keyboardType="email-address"
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            title="Email"
            placeholder="Enter your email"
            value={email}
          />

          <DynamicButton
            titleClassName="!text-white !font-poppinsMedium !text-lg"
            onPress={forgot}
            title="Send Reset Link"
            isLoading={forgotLoading}
          />

          <View className="flex flex-row items-center gap-2 self-center">
            <Text className="my-4 text-center  font-poppinsMedium text-lg text-tertiary dark:text-[#c7c5c58B]">
              Don't want to reset your password?{' '}
            </Text>
            <Link href={routes.auth.auth as Href} asChild>
              <TouchableOpacity>
                <Text className="font-poppinsMedium font-medium dark:text-white">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgotPassword;
