/* eslint-disable import/order */
import React from 'react';
import { View } from 'react-native';
import { cn } from '~/utils/helper';

import { useRouter } from 'expo-router';
import { DefaultText } from '../common/DefaultText';
import { Entypo } from '@expo/vector-icons';

const GlobalHeader = ({ route }: any) => {
  const router: any = useRouter();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View className={cn('flex-row justify-between gap-4 rounded-b-xl p-5 md:p-4', 'bg-primary')}>
      {route.route.name === 'home' ? (
        <View className="h-1 w-4" />
      ) : (
        <Entypo name="chevron-left" size={24} color="white" onPress={handleGoBack} />
      )}
      <DefaultText className="text-center text-2xl font-semibold text-white">
        {`${route.route.name.charAt(0).toUpperCase()}${route.route.name.slice(1)}`}
      </DefaultText>
      <View className="h-1 w-4" />
    </View>
  );
};

export default GlobalHeader;
