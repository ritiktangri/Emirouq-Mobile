import { View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '~/components/UI/AuthHeader';
import Input from '~/components/UI/Input';
import DynamicButton from '~/components/DynamicButton';
import { logo, pwd_background } from '~/image';
import { useAuth } from '~/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { encode } from 'js-base64';
import { Href, Link, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '~/components/common/Text';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';

const Page = () => {
  const { resetPass, forgotLoading } = useAuth();
  const [secureTextNewPassword, setSecureTextNewPassword] = useState(false);
  const [secureTextConfirmPassword, setSecureTextConfirmPassword] = useState(false);
  const router = useRouter();
  const { isDarkTheme } = useTheme();
  const state = useLocalSearchParams();

  const [password, setPassword] = useState<any>({
    newPassword: '',
    confirmedPassword: '',
  });

  const [errors, setErrors] = useState<any>({
    newPassword: '',
    confirmedPassword: '',
  });

  const onChangeText = (field: any, value: string) => {
    const newErrors = { ...errors };
    const newPassword = { ...password, [field]: value };

    if (field === 'newPassword' && value.length < 6) {
      newErrors.newPassword = 'Your new password must be more than 6 characters';
    } else if (field === 'confirmedPassword' && value !== password.newPassword) {
      newErrors.confirmedPassword = "Passwords don't match";
    } else if (!value) {
      newErrors[field] = 'Password is required!';
    } else {
      newErrors[field] = '';
    }
    setErrors(newErrors);
    setPassword(newPassword);
  };

  const onUpdatePassword = () => {
    if (errors?.newPassword == '' && errors?.confirmedPassword == '' && password.newPassword) {
      resetPass(
        {
          pathParams: {
            token: encode(`${state.email}:${password.newPassword}`),
          },
        },
        () => {
          router.replace('/(auth)/auth');
        }
      );
    }
  };

  return (
    <ImageBackground className="flex-1 flex-col" source={isDarkTheme ? pwd_background : ''}>
      <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 flex-col">
        <View className="flex-row justify-end px-8 pt-4">
          <Image source={logo} className="h-[70px] w-[70px]" resizeMode="contain" />
        </View>
        <View className="mt-12 flex-col gap-y-6 p-6">
          <Text className="font-poppinsMedium text-3xl font-semibold dark:text-white">
            Update Password!
          </Text>
          <Input
            className="w-full py-4 dark:text-white"
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            onChangeText={(value: any) => onChangeText('newPassword', value)}
            secureTextEntry={!secureTextNewPassword}
            title="New Password"
            placeholder="Enter your password"
            suffix={
              <TouchableOpacity className="px-2">
                <Ionicons
                  name={secureTextNewPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color={isDarkTheme ? '#c7c7c7' : ''}
                  onPress={() => setSecureTextNewPassword(!secureTextNewPassword)}
                />
              </TouchableOpacity>
            }
            inputStyle={{
              borderColor: errors?.newPassword ? 'red' : 'grey',
            }}
            description={errors?.newPassword}
            descriptionStyle="!text-red-500"
          />
          <Input
            className=" w-full py-4 dark:text-white"
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            onChangeText={(value: any) => onChangeText('confirmedPassword', value)}
            secureTextEntry={!secureTextConfirmPassword}
            title="Confirm Password"
            placeholder="Enter your password"
            suffix={
              <TouchableOpacity className="px-2">
                <Ionicons
                  name={secureTextConfirmPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color={isDarkTheme ? '#c7c7c7' : ''}
                  onPress={() => setSecureTextConfirmPassword(!secureTextConfirmPassword)}
                />
              </TouchableOpacity>
            }
            inputStyle={{
              borderColor: errors?.confirmedPassword ? 'red' : 'grey',
            }}
            description={errors?.confirmedPassword}
            descriptionStyle="!text-red-500"
          />

          <DynamicButton
            onPress={() => onUpdatePassword()}
            title="Confirm"
            isLoading={forgotLoading}
            titleClassName="!text-white !font-poppinsMedium !text-lg"
          />
          <View className="flex flex-row items-center gap-2 self-center">
            <Text className="my-4 text-center  font-poppinsMedium text-lg text-tertiary dark:text-[#c7c5c58B]">
              Don't want to reset your password?{' '}
            </Text>
            <Link href={routes.auth.login as Href} asChild>
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

export default Page;
