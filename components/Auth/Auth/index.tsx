/* eslint-disable no-void */
/* eslint-disable import/order */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/common/Text';
import { light_logo, login_background, logo } from '~/image';
import { useTheme } from '~/context/ThemeContext';
import Signup from './sign-up';
import Login from './login';
import * as WebBrowser from 'expo-web-browser';
import SocialButtons from './social-btn';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

const LoginComponent = () => {
  const [checkinType, setCheckinType] = useState('email');
  const { isDarkTheme } = useTheme();
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('signup');
  const [form, setForm] = useState({
    email: 'gurpreet@gmail.com',
    password: '123456',
  });

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
            <View className="flex-1">
              <View className="mt-8 ">
                <Image
                  source={colorScheme === 'dark' ? logo : light_logo}
                  className="h-[80px] w-full"
                  resizeMode="contain"
                />
                <Text className="my-2 text-center font-poppinsMedium text-xl font-semibold dark:text-white">
                  Welcome To Emirouq!
                </Text>
                <Text className="my-1 text-center font-poppinsMedium text-xl font-semibold dark:text-white">
                  مرحباً
                </Text>
              </View>
              <SocialButtons />
              <View className="my-6 flex-row items-center">
                <View className="h-px flex-1 bg-gray-200" />
                <Text className="mx-4 font-['Inter-Regular'] text-sm text-gray-500">or</Text>
                <View className="h-px flex-1 bg-gray-200" />
              </View>

              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}>
                <View className="flex-1 px-6 pb-4">
                  <View className="flex-row border-b border-gray-200">
                    <TouchableOpacity
                      className={`flex-1 pb-4 ${activeTab === 'signup' ? 'border-primary-600 border-b-2' : ''}`}
                      onPress={() => setActiveTab('signup')}>
                      <Text
                        className={`text-center font-['Inter-Bold'] text-base ${activeTab === 'signup' ? 'text-primary-600' : 'text-gray-500'}`}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`flex-1 pb-4 ${activeTab === 'login' ? 'border-primary-600 border-b-2' : ''}`}
                      onPress={() => setActiveTab('login')}>
                      <Text
                        className={`text-center font-['Inter-Bold'] text-base ${activeTab === 'login' ? 'text-primary-600' : 'text-gray-500'}`}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    className={`mt-3 flex-row items-center justify-around rounded-md  bg-gray-200 p-1`}>
                    <TouchableOpacity
                      className={`w-[49%] ${checkinType === 'email' ? 'bg-white' : ''} rounded-md  p-3`}
                      onPress={() => {
                        setCheckinType('email');
                      }}>
                      <Text className="text-center">Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`w-[49%] ${checkinType === 'phone' ? 'bg-white' : ''} rounded-md p-3`}
                      onPress={() => {
                        setCheckinType('phone');
                      }}>
                      <Text className="text-center">Phone</Text>
                    </TouchableOpacity>
                  </View>
                  {activeTab === 'signup' ? (
                    <Signup checkinType={checkinType} />
                  ) : (
                    <Login checkinType={checkinType} />
                  )}
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginComponent;
