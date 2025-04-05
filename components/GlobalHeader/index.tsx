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
    <View className={cn('flex-row justify-between gap-4 rounded-b-xl p-5 md:p-4', 'bg-primary')}>
      {headerTitle || title ? (
        <Entypo name="chevron-left" size={24} color="white" onPress={handleGoBack} />
      ) : (
        <View className="h-1 w-4" />
      )}
      <Text className="text-center text-2xl font-semibold capitalize text-white">
        {title ? title : headerTitle ? i18n.t(headerTitle) : i18n.t(`tab.${route?.route?.name}`)}
      </Text>
      <View className="h-1 w-4" />
    </View>
  );
};

export default GlobalHeader;
