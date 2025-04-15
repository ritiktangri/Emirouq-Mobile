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
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);

const Render = ({ item }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: routes.tabs.chatScreen(item?.uuid),
          params: {
            conversationId: item?.uuid,
            fullName: `${item?.user?.firstName} ${item?.user?.lastName}`,
            profileImage: item?.profileImage,
            userId: item?.user?.uuid,
            uuid: item?.post?.uuid,
            chatTitle: true,
            name: item?.post?.title,
            file: item?.post?.file?.[0],
            price: item?.post?.price,
          },
        } as unknown as Href);
      }}
      className="flex-row items-center gap-2 border-b border-gray-200  px-3 py-3">
      {item?.profileImage ? (
        <View className=" h-14 w-14 rounded-full bg-black">
          <Image
            source={{ uri: item?.profileImage }}
            className="h-full w-full rounded-full" // Use a default image or placeholder if needed
            resizeMode="cover"
          />
        </View>
      ) : (
        <View className="flex h-14  w-14 items-center justify-center rounded-full bg-primary">
          <Text className=" font-poppinsMedium text-xl text-white">
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
            {formatLastMessageTime(item?.lastMessageTime)}
          </Text>
        </View>
        <View className="flex-row items-center ">
          <View className="flex flex-row items-center gap-3">
            <View className=" h-10 w-10 rounded-full  ">
              <Image
                source={{ uri: item?.post?.file?.[0] }}
                className="h-full w-full rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="flex-1">
              <Text className="max-w-56 text-[15px] text-gray-700">{item?.post?.title}</Text>
              <Text className="font-poppinsMedium text-base">{toCurrency(item?.post?.price)}</Text>
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

const formatLastMessageTime = (unixTimestamp: number) => {
  const messageTime = dayjs.unix(unixTimestamp);
  const now = dayjs();

  if (now.diff(messageTime, 'day') < 1) {
    // Less than a day → "x hours ago"
    return messageTime.fromNow(); // e.g., "2 hours ago"
  } else if (now.diff(messageTime, 'day') < 7) {
    // Within the week → Day of the week (e.g., "Monday")
    return messageTime.format('dddd');
  } else {
    // Older → Date (e.g., "28 Mar, 2024")
    return messageTime.format('DD MMM, YYYY');
  }
};
