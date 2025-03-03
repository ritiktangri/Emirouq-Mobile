/* eslint-disable import/order */
import React from 'react';

import SelectAccount from './selectAccount';
import { TouchableOpacity, View } from 'react-native';
import Filter from './filter';
import CalendarComponent from './calendar';
import { cn } from '~/utils/helper.utils';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';

const GlobalHeader = () => {
  const router = useRouter();
  return (
    <View
      className={cn(
        'flex flex-row items-center  gap-4  rounded-b-xl p-6 md:p-4',
        'bg-white dark:bg-dashboard_card'
      )}>
      <SelectAccount />
      <View className="flex flex-row items-center gap-4">
        <Filter />
        <CalendarComponent />
        <TouchableOpacity onPress={() => router.push(routes.user.add_trade as Href)}>
          <Ionicons name="add" size={24} className="!text-black dark:!text-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GlobalHeader;
