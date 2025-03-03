/* eslint-disable import/order */
import { TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DefaultText as Text } from '~/components/common/DefaultText';

const Header = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center gap-2 pb-2 pl-4 dark:pb-0">
        <Ionicons name="arrow-back" size={24} className="dark:!text-[#94969C]" />
        <Text className="dark:text-tertiary">Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;
