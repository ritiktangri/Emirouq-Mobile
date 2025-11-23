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
import { queryClient } from '~/app/_layout';

dayjs.extend(relativeTime);
dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);

//from single post send
// all response plus receiverId
const Render = ({ item }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: routes.tabs.chatScreen(item?.uuid),
          params: {
            conversationId: item?.uuid,
            usersInConversation: item?.users,
            firstName: item?.receiver?.firstName,
            lastName: item?.receiver?.lastName,
            fullName: `${item?.receiver?.firstName} ${item?.receiver?.lastName}`,
            profileImage: item?.receiver?.profileImage,
            receiverId: item?.receiver?.uuid,
            uuid: item?.post?.uuid,
            postId: item?.post?.uuid,
            chatTitle: true,
            name: item?.post?.title,
            file: item?.post?.file?.[0],
            price: item?.post?.price,
            post: JSON.stringify(item?.post),
            sortConversation: !!item?.chatDetails?.count,
            count: item?.chatDetails?.count,
            receiverLastOnlineTime: item?.receiverOnline?.lastOnlineTime,
          },
        } as unknown as Href);
      }}
      className="flex-row items-center gap-2 border-b border-gray-200  px-3 py-3">
      {item?.receiver?.profileImage ? (
        <View className=" h-14 w-14 rounded-full bg-black">
          <Image
            source={{ uri: item?.receiver?.profileImage }}
            className="h-full w-full rounded-full" // Use a default image or placeholder if needed
            resizeMode="cover"
          />
        </View>
      ) : (
        <View className="flex h-14  w-14 items-center justify-center rounded-full bg-primary">
          <Text className=" font-poppinsMedium text-xl text-white">
            {getInitials(`${item?.receiver?.firstName} ${item?.receiver?.lastName}`)}
          </Text>
        </View>
      )}
      <View className="w-full flex-1 ">
        <View className="w-full flex-row items-center ">
          <Text className="flex-1 font-poppinsMedium text-lg">
            {item?.receiver?.firstName} {item?.receiver?.lastName}
          </Text>
          <Text className="text-sm text-gray-500">
            {formatLastMessageTime(item?.lastMessageTime)}
          </Text>
        </View>
        <View className="flex-row items-center ">
          <View className="flex flex-row items-center gap-2">
            <View className="h-10 w-10 rounded-full">
              <Image
                source={{ uri: item?.post?.file?.[0] }}
                className="h-full w-full rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="flex-1">
              <Text className="max-w-56 text-[13px] text-gray-700">{item?.post?.title}</Text>
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
          <View direction="row" className="mt-[0.5px]">
            {item?.lastMessage ? (
              <Text className="flex-1 text-base text-gray-600">{item?.lastMessage}</Text>
            ) : (
              <></>
            )}
            {item?.chatDetails?.count ? (
              <View className=" flex h-5 w-5 items-center justify-center rounded-full bg-red-500">
                <Text className="text-xs font-bold text-white">{item?.chatDetails?.count}</Text>
              </View>
            ) : (
              <></>
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
