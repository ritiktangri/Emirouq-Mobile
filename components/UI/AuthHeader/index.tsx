/* eslint-disable import/order */
import { View, Image, TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { light_logo, logo } from '~/image';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useTheme } from '~/context/ThemeContext';

const AuthHeader = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <View className="m-6 flex-row items-start justify-between">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => {
          router.back();
        }}>
        <Ionicons name="chevron-back" size={18} className="dark:!text-[#c7c5c5]" />
        <Text className="font-poppinsMedium dark:text-[#c7c5c5]">Back</Text>
      </TouchableOpacity>
      <Image
        source={colorScheme === 'dark' ? logo : light_logo}
        className="h-[70px] w-[70px]"
        resizeMode="contain"
      />
    </View>
  );
};

export default AuthHeader;
