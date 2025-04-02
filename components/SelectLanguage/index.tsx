/* eslint-disable import/order */
import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/common/Text';
import { light_logo, logo } from '~/image';
import { useLocale } from '~/context/LocaleContext';
import { Ionicons } from '@expo/vector-icons';
import { routes } from '~/utils/routes';
import { Href, useRouter } from 'expo-router';
import { useAuth } from '~/context/AuthContext';
import { useTheme } from '~/context/ThemeContext';

const SelectLanguage = () => {
  const { showToast }: any = useTheme();
  const [select, setSelect] = useState('');
  const { user } = useAuth();
  const { changeLocale } = useLocale();
  const router = useRouter();
  const navigate = useCallback(() => {
    if (!user?.uuid) {
      router.push(routes.auth.auth as Href);
    } else {
      router.push(routes.tabs.home as Href);
    }
  }, [user, router, routes]);

  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1  bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} // Add offset if needed
      >
        <View className="flex-1 bg-white">
          <View className="mt-8 ">
            <Image source={light_logo} className="h-[80px] w-full" resizeMode="contain" />
            <Text className="my-2 text-center font-poppinsMedium text-xl font-semibold dark:text-white">
              Welcome To Emirouq!
            </Text>
            <Text className="my-1 text-center font-poppinsBold text-2xl  text-tertiary">
              مرحبًا!
            </Text>
            <Text variant="callout" color="tertiary" className="my-1 text-center font-normal  ">
              Please select your preferred language
            </Text>
            <Text color="tertiary" variant="callout" className="my-1 text-center font-normal  ">
              يرجى اختيار لغتك المفضلة
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}>
            <View className="flex-1 gap-3 px-6 pb-4">
              {[
                {
                  name: 'English',
                  code: 'en',
                  image: logo,
                  isChecked: false,
                },
                {
                  name: 'Arabic',
                  code: 'sa',
                  image: logo,
                  isChecked: false,
                },
              ]?.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    setSelect(item.code);
                  }}>
                  <View className="dark:bg-darkGray flex-row items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                    <View className="flex-row items-center">
                      <Image source={item.image} className="h-6 w-6 rounded-full" />
                      <Text className="ml-4 font-poppinsMedium text-base text-tertiary dark:text-white">
                        {item.name}
                      </Text>
                    </View>
                    <Ionicons
                      name={select === item.code ? 'checkmark-circle' : 'ellipse-outline'}
                      size={24}
                      color="#4CAF50"
                      className="ml-4"
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))}
              <TouchableOpacity
                onPress={() => {
                  if (!select) {
                    return showToast('Please select a language', 'error');
                  }
                  changeLocale(select);
                  navigate();
                }}
                className="flex-row items-center justify-center rounded-lg bg-primary p-4">
                <Text className="text-center font-poppinsBold text-base text-white ">Continue</Text>
              </TouchableOpacity>
              <View className="">
                <Text variant="callout" color="tertiary" className="text-center font-normal">
                  You can change your language later in Settings
                </Text>
                <Text className="text-center" color="tertiary">
                  يمكنك تغيير لغتك لاحقًا في الإعدادات
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SelectLanguage;

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
