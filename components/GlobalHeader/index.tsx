/* eslint-disable import/order */
import React from 'react';
import { View } from 'react-native';
import { cn } from '~/utils/helper.utils';
import { Href, useRouter } from 'expo-router';
import { DefaultText } from '../common/DefaultText';

const GlobalHeader = ({ route }: any) => {
  const router = useRouter();
  console.log('route', route.route.name);
  return (
    <View className={cn('gap-4 rounded-b-xl p-5 md:p-4', 'bg-primary')}>
      <DefaultText className="text-center text-2xl font-semibold text-white">
        {`${route.route.name.charAt(0).toUpperCase()}${route.route.name.slice(1)}`}
      </DefaultText>
    </View>
  );
};

export default GlobalHeader;
