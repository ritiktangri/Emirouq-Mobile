/* eslint-disable import/order */
import Checkbox from 'expo-checkbox';
import { Href, Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DefaultText as Text } from '~/components/common/DefaultText';

import Input from '../../UI/Input';

import { light_logo, login_background, login_form_background, logo } from '~/image';
import { useAuth } from '~/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import DynamicButton from '~/components/DynamicButton';
import { routes } from '~/utils/routes';
import { useTheme } from '~/context/ThemeContext';

const LoginComponent = () => {
  const [isChecked, setChecked] = useState(false);
  const { login, signInLoading } = useAuth();
  const { isDarkTheme } = useTheme();
  const colorScheme = useColorScheme();
  const [form, setForm] = useState({
    email: 'mskahlon1998@gmail.com',
    password: '123456',
  });
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const onChangeText = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handleLogin = () => {
    const params = {
      email: form.email,
      password: form.password,
    };
    login(
      params,
      () => {},
      () => {}
    );
  };
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        className="flex-1 flex-col bg-white"
        source={isDarkTheme ? login_background : ''}>
        <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 flex-col">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // Add offset if needed
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              ref={scrollViewRef}>
              <View className="relative top-[10%]">
                <Image
                  source={colorScheme === 'dark' ? logo : light_logo}
                  className="h-[35%] w-full"
                  resizeMode="contain"
                />
                <Text className="my-8 text-center font-poppinsMedium text-2xl font-semibold dark:text-white">
                  Welcome back! Please {'\n'} Sign in to continue.
                </Text>
              </View>
              <View className="flex-1 rounded-t-3xl bg-gray-100 dark:bg-transparent">
                <ImageBackground
                  className="flex-1 flex-col gap-y-3 px-8 py-8"
                  style={styles.backgroundStyle}
                  source={isDarkTheme ? login_form_background : ''}>
                  <Input
                    value={form.email}
                    inputStyle={
                      isDarkTheme
                        ? {}
                        : {
                            backgroundColor: 'white',
                            borderColor: 'lightgrey',
                          }
                    }
                    onChangeText={(value: any) => onChangeText('email', value)}
                    title="Email"
                    placeholder="Enter your email"
                    className=" w-full py-4 dark:text-white"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    spellCheck={false}
                    autoCorrect={false}
                    onFocus={() => {
                      // Scroll to the top when the email input is focused
                      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                    }}
                  />
                  <Input
                    value={form.password}
                    className=" w-full py-4 dark:text-white"
                    suffix={
                      <TouchableOpacity className="px-2">
                        <Ionicons
                          name={secureTextEntry ? 'eye' : 'eye-off'}
                          size={20}
                          color="#c7c7c7"
                          onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                      </TouchableOpacity>
                    }
                    inputStyle={
                      isDarkTheme
                        ? {}
                        : {
                            backgroundColor: 'white',
                            borderColor: 'lightgrey',
                          }
                    }
                    onChangeText={(value: any) => onChangeText('password', value)}
                    secureTextEntry={!secureTextEntry}
                    title="Password"
                    placeholder="Enter your password"
                    onFocus={() => {
                      // Scroll to a position above the password input when focused
                      scrollViewRef.current?.scrollTo({ y: 150, animated: true }); // Adjust 150 as needed
                    }}
                  />
                  <View className="my-4 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        style={styles.checkbox}
                      />
                      <Text className="font-interMedium text-tertiary dark:text-[#c7c7c7]">
                        Remember for 30 days
                      </Text>
                    </View>

                    <DynamicButton
                      href={routes.auth.forgot_pwd as Href}
                      titleClassName="!text-base !font-poppinsMedium !text-[#3872FA]"
                      title="Forgot Password?"
                      isLoading={signInLoading}
                    />
                  </View>
                  <DynamicButton
                    className="rounded-xl"
                    titleClassName="!text-white !font-poppinsMedium !text-lg"
                    onPress={handleLogin}
                    title="Sign In"
                    isLoading={signInLoading}
                  />
                  <Text className="my-4 text-center font-interMedium text-tertiary dark:text-[#c7c5c5]">
                    Need Help?{' '}
                    <Text className="font-interMedium font-semibold text-black dark:text-white">
                      support@tradelizer.com
                    </Text>
                  </Text>
                </ImageBackground>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginComponent;

const styles = StyleSheet.create({
  backgroundStyle: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  checkbox: {
    height: 16,
    width: 16,
    marginLeft: 4,
  },
});
