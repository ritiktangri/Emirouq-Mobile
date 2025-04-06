/* eslint-disable import/order */
import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { getInitials, toCurrency } from '~/utils/helper';
import { View } from '../common/View';
import { Text } from '../common/Text';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import dayjs from 'dayjs';

const Render = ({ item }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: routes.chatScreen,
          params: {
            conversationId: item?.uuid,
          },
        } as Href);
      }}
      className="flex-row items-center gap-2 border-b border-gray-200  px-3 py-4">
      {item?.profileImage ? (
        <View className=" h-16 w-16 rounded-full bg-black">
          <Image
            source={{ uri: item?.profileImage }}
            className="h-full w-full rounded-full" // Use a default image or placeholder if needed
            resizeMode="cover"
          />
        </View>
      ) : (
        <View className="flex h-16  w-16 items-center justify-center rounded-full bg-primary">
          <Text className=" font-poppinsMedium text-2xl">
            {getInitials(`${item?.user?.firstName} ${item?.user?.lastName}`)}
          </Text>
        </View>
      )}
      <View className="w-full flex-1 ">
        <View className="w-full flex-row items-center ">
          <Text className="flex-1 font-poppinsMedium text-lg">
            {item?.user?.firstName} {item?.user?.lastName}
          </Text>
          <Text className="text-sm text-gray-500">
            {dayjs.unix(item?.lastMessageTime).format('DD MMM, YYYY HH:mm A')}
          </Text>
        </View>
        <View className="flex-row items-center ">
          <View className="flex flex-row items-center gap-3">
            <View className=" h-12 w-12 rounded-full  ">
              <Image
                source={{ uri: item?.post?.file?.[0] }}
                className="h-full w-full rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="flex-1">
              <Text className="text-lg">{item?.post?.title}</Text>
              <Text className="font-poppinsMedium text-base text-gray-700">
                {toCurrency(item?.post?.price)}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
              color="#6B7280"
              className="ml-auto"
            />
          </View>
        </View>
        {item?.lastMessage ? (
          <View direction="row" className="mt-1">
            <Text className="flex-1 text-base text-gray-600">{item?.message}</Text>
            {item?.count && (
              <View className=" flex h-5 w-5 items-center  rounded-full bg-red-500">
                <Text className="text-xs font-bold text-white">{item?.count}</Text>
              </View>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Render;
