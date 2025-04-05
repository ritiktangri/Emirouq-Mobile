/* eslint-disable import/order */
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Href, router } from 'expo-router';
import { routes } from '~/utils/routes';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '~/utils/helper';
import Image from '~/components/common/Image';

const Header = ({ data }: any) => {
  return (
    <View className="flex flex-row items-center gap-5 border-b border-gray-200 px-3 py-2 ">
      <TouchableOpacity
        onPress={() => {
          router.push(routes.tabs.chat as Href);
        }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex flex-1 flex-row items-center gap-3">
        <View className=" relative h-16 w-16 rounded-full bg-black">
          <View className="absolute -right-1 bottom-0 z-10 h-4 w-4 rounded-full bg-white">
            {data?.status === 'online' ? (
              <View className="h-2 w-2 rounded-full bg-green-500" />
            ) : (
              <></>
            )}
          </View>
          <Image source={data?.avatar} contentFit="fill" expoImage />
        </View>
        <View>
          <Text className="text-lg font-semibold text-black">{data?.name}</Text>
          <View className="flex-row items-center gap-2">
            <Text
              className={cn(
                data?.status
                  ? data?.status === 'online'
                    ? 'text-green-500'
                    : 'text-red-500'
                  : 'text-red-500',
                'text-lg  '
              )}>
              {data?.status === 'online' ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
