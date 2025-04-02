/* eslint-disable import/order */
import React, { useState, useCallback } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/common/Text';
import { arabic, english, light_logo } from '~/image';
import { useLocale } from '~/context/LocaleContext';
import { Ionicons } from '@expo/vector-icons';
import { routes } from '~/utils/routes';
import { Href, useRouter } from 'expo-router';
import { useAuth } from '~/context/AuthContext';
import { useTheme } from '~/context/ThemeContext';
import theme from '~/utils/theme';

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

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className="flex-1  items-center justify-center bg-white">
      <View className="mt-10">
        <Image source={light_logo} className="h-[80px] " resizeMode="contain" />
        <Text className="my-2 text-center font-poppinsMedium text-xl font-semibold dark:text-white">
          Welcome To Emirouq!
        </Text>
        <Text className="my-1 text-center font-poppinsBold text-2xl  text-tertiary">مرحبًا!</Text>
        <Text variant="callout" color="tertiary" className="my-1 text-center font-normal  ">
          Please select your preferred language
        </Text>
        <Text color="tertiary" variant="callout" className="my-1 text-center font-normal  ">
          يرجى اختيار لغتك المفضلة
        </Text>
      </View>

      <View className="my-5 flex-1  gap-3 px-6">
        {[
          {
            name: 'English',
            code: 'en',
            image: english,
            isChecked: false,
          },
          {
            name: 'Arabic',
            code: 'sa',
            image: arabic,
            isChecked: false,
          },
        ]?.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              setSelect(item.code);
            }}>
            <View
              className=" w-full flex-row items-center justify-between rounded-lg bg-white p-4 "
              style={{
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,

                elevation: 2,
              }}>
              <View className="flex-row items-center">
                <Image source={item.image} className="h-10 w-10 rounded-full" />
                <Text className="ml-4 font-poppinsMedium text-base text-tertiary dark:text-white">
                  {item.name}
                </Text>
              </View>
              <Ionicons
                name={select === item.code ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={theme.colors.primary}
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
          className="mt-7 flex-row items-center justify-center rounded-lg bg-primary p-4">
          <Text className="text-center font-poppinsBold text-base text-white ">Continue</Text>
        </TouchableOpacity>
        <View className="gap-2">
          <Text variant="callout" color="tertiary" className="text-center font-normal">
            You can change your language later in settings
          </Text>
          <Text className="text-center" color="tertiary">
            يمكنك تغيير لغتك لاحقًا في الإعدادات
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectLanguage;
