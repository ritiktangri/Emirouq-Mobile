/* eslint-disable import/order */
import React from 'react';
import { View } from 'react-native';
import { cn } from '~/utils/helper';

import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { Text } from '../common/Text';
import { i18n } from '~/utils/i18n';

const GlobalHeader = ({ route }: any) => {
  const router: any = useRouter();
  const { headerTitle, title } = useGlobalSearchParams();
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <View className={cn('flex-row   rounded-b-xl p-4', 'bg-primary')}>
      {headerTitle || title ? (
        <View className=" w-[10%] ">
          <Entypo name="chevron-left" size={24} color="white" onPress={handleGoBack} />
        </View>
      ) : (
        <View className=" w-[10%] " />
      )}
      <View className="w-[80%] items-center justify-center">
        <Text className=" text-center text-xl font-semibold capitalize text-white">
          {title ? title : headerTitle ? i18n.t(headerTitle) : i18n.t(`tab.${route?.route?.name}`)}
        </Text>
      </View>
      <View className=" w-[10%] " />
    </View>
  );
};

export default GlobalHeader;
