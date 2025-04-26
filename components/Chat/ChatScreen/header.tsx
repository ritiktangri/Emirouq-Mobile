/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { cn, getInitials } from '~/utils/helper';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useAuth } from '~/context/AuthContext';
import { useAppState } from '@react-native-community/hooks';

const Header = ({ data, status }: any) => {
  const router = useRouter();
  const { socketIo, user } = useAuth();
  const currentAppState = useAppState();

  // this is required..
  // here , we are leaving the conversation when the user is not active
  useEffect(() => {
    if (currentAppState !== 'active') {
      socketIo?.emit('leave_conversation', {
        conversationId: data?.conversationId,
        userId: user?.uuid,
      });
    }
    return () => {
      socketIo?.emit('leave_conversation', {
        conversationId: data?.conversationId,
        userId: user?.uuid,
      });
    };
  }, [currentAppState]);
  return (
    <View className="flex flex-row items-center gap-2 border-b border-gray-200 px-3 py-2 ">
      <TouchableOpacity
        onPress={() => {
          router.setParams({
            conversationId: undefined,
            userId: undefined,
            postId: undefined,
          });
          // here we are leaving the conversation
          socketIo?.emit('leave_conversation', {
            conversationId: data?.conversationId,
            userId: user?.uuid,
          });
          router.replace(routes.tabs.chat as Href);
        }}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      <View className="flex flex-1 flex-row items-center gap-3">
        <View className=" relative h-12 w-12 rounded-full ">
          {status ? (
            <View className="absolute -right-2 bottom-0 z-10 h-4 w-4 rounded-full ">
              <View className="h-2 w-2 rounded-full bg-green-500" />
            </View>
          ) : (
            <></>
          )}
          {data?.profileImage ? (
            <Image source={data?.profileImage} resizeMode="cover" />
          ) : (
            <View className="flex h-12  w-12 items-center justify-center rounded-full bg-primary">
              <Text className=" font-poppinsMedium text-2xl text-white">
                {getInitials(data?.fullName)}
              </Text>
            </View>
          )}
        </View>
        <View className="">
          <Text className="text-2xl font-semibold text-black">{data?.fullName}</Text>
          {status ? (
            <View className="flex-row items-center gap-2">
              <Text className={cn('font-poppinsMedium text-green-500')}>Online</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
