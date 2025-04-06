/* eslint-disable import/order */
import React, { RefObject, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ImageBackground, TouchableOpacity, TextInput, Image } from 'react-native';
import theme from '~/utils/theme';
import { Href, Link, useLocalSearchParams, useRouter } from 'expo-router';
import { OTPInput } from '~/components/UI/OtpInput';
import { useAuth } from '~/context/AuthContext';
import { routes } from '~/utils/routes';
import DynamicButton from '~/components/DynamicButton';
import { Text } from '~/components/common/Text';
import { logo } from '~/image';
import { useTheme } from '~/context/ThemeContext';

const VerifyOtp = () => {
  const { email, phone } = useLocalSearchParams();

  const { isDarkTheme } = useTheme();
  const [codes, setCodes] = useState(['', '', '', ''] as any);
  const { verify, forgotPassword, verifyOtpLoading } = useAuth();
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string[] | undefined>(undefined);
  const refs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const resendOtp = () => {
    forgotPassword(
      {
        body: {
          email,
        },
      },
      () => {
        // toast.success('Otp has been sent successfully to your email');
      }
    );
  };

  const onChangeCode = (text: string, index: number) => {
    const newCodes = [...codes];
    newCodes[index] = text;
    setCodes(newCodes);
    setErrorMessages(undefined);
  };

  const handleVerifyOtp = () => {
    const encode = `${email ? email : phone}:${codes?.join('')}`;
    verify(
      {
        pathParams: {
          token: btoa(encode),
        },
      },
      (payload: any) => {
        //  toast.success('Otp has been verified successfully');
        router.push(routes?.auth?.auth as Href);
        if (email) {
          router.setParams({ email });
        } else {
          router.setParams({ phone: phone });
        }
      }
    );
  };

  return (
    <ImageBackground className="flex-1 flex-col" source={isDarkTheme ? '' : ('' as any)}>
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 flex-col bg-white">
        <View className="flex-row justify-end px-8 pt-4">
          <Image source={logo} className="h-[70px] w-[70px]" resizeMode="contain" />
        </View>
        <View className="mt-12 flex-col gap-y-6 p-6">
          <Text className="text-3xl font-semibold dark:text-white">Enter the code!</Text>
          <OTPInput
            codes={codes!}
            errorMessages={errorMessages}
            onChangeCode={onChangeCode}
            refs={refs}
            config={{
              backgroundColor: theme.colors.transparent,
              textColor: isDarkTheme ? 'white' : '',
              borderColor: theme.colors.gray,
              errorColor: theme.colors.red,
              focusColor: theme.colors.black,
            }}
          />

          <DynamicButton
            onPress={handleVerifyOtp}
            title="Verify OTP"
            isLoading={verifyOtpLoading}
            titleClassName="!text-white !font-poppinsMedium !text-lg"
          />

          <TouchableOpacity
            onPress={resendOtp}
            className="flex w-full flex-row items-center gap-2 self-center rounded-md border border-black">
            <Text
              className="my-4 w-full text-center font-semibold"
              style={{
                color: isDarkTheme ? theme.colors.white : 'black',
              }}>
              Resend OTP
            </Text>
          </TouchableOpacity>
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

export default VerifyOtp;
