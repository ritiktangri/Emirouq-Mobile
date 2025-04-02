import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '~/components/common/Text';

const CustomHeader = () => {
  const router = useRouter();
  return (
    <View className="my-4 flex-row items-start justify-between">
      <TouchableOpacity
        className="flex-row items-center"
        onPress={() => {
          router.back();
        }}>
        <Ionicons name="chevron-back" size={27} className="!text-black dark:!text-white" />
        <Text
          className="
        font-poppinsMedium text-base !text-black dark:!text-white
        ">
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
