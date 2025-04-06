/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { cn, getInitials } from '~/utils/helper';
import { router } from 'expo-router';

const Header = ({ data, onPress }: any) => {
  return (
    <View className="flex flex-row items-center gap-2 border-b border-gray-200 px-3 py-2 ">
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View className="flex flex-1 flex-row items-center gap-3">
        <View className=" relative h-12 w-12 rounded-full bg-black">
          {data?.status === 'online' ? (
            <View className="absolute -right-1 bottom-0 z-10 h-4 w-4 rounded-full bg-white">
              <View className="h-2 w-2 rounded-full bg-green-500" />
            </View>
          ) : (
            <></>
          )}
          {data?.profileImage ? (
            <Image source={data?.profileImage} resizeMode="cover" />
          ) : (
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
              <Text className=" font-poppinsMedium text-2xl text-white">
                {getInitials(data?.fullName)}
              </Text>
            </View>
          )}
        </View>
        <View className="">
          <Text className="text-xl font-semibold text-black">{data?.fullName}</Text>
          <View className="flex-row items-center gap-2">
            <Text
              className={cn(
                data?.status
                  ? data?.status === 'online'
                    ? 'text-green-500'
                    : 'text-red-500'
                  : 'text-red-500',
                ''
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
