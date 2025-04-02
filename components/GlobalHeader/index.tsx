/* eslint-disable import/order */
import React from 'react';
import { View } from 'react-native';
import { cn } from '~/utils/helper';

import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { Text } from '../common/Text';
import { i18n } from '~/utils/i18n';

const GlobalHeader = ({ route }: any) => {
  const router: any = useRouter();
  const { headerTitle } = useGlobalSearchParams();
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <View className={cn('flex-row justify-between gap-4 rounded-b-xl p-5 md:p-4', 'bg-primary')}>
      {!headerTitle ? (
        <View className="h-1 w-4" />
      ) : (
        <Entypo name="chevron-left" size={24} color="white" onPress={handleGoBack} />
      )}
      <Text className="text-center text-2xl font-semibold capitalize text-white">
        {headerTitle ? i18n.t(headerTitle) : i18n.t(`tab.${route?.route?.name}`)}
      </Text>
      <View className="h-1 w-4" />
    </View>
  );
};

export default GlobalHeader;
