/* eslint-disable import/order */
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { cn, getInitials } from '~/utils/helper';
import { Href, useRouter } from 'expo-router';
import { routes } from '~/utils/routes';
import { useAuth } from '~/context/AuthContext';
import { useAppState } from '@react-native-community/hooks';
import { useAudioPlayer } from '~/context/AudioPlayerContext';

const Header = ({ data, status }: any) => {
  const router = useRouter();
  const { socketIo, user } = useAuth();
  const currentAppState = useAppState();
  const { clearAudioCache, stop } = useAudioPlayer();
  useEffect(() => {
    if (socketIo?.connected) {
      if (currentAppState !== 'active') {
        socketIo?.emit('leave_conversation', {
          conversationId: data?.conversationId,
          userId: user?.uuid,
        });
        clearAudioCache(); // Clear the audio cache when the app goes to background or inactive state
      }
      return () => {
        socketIo?.emit('leave_conversation', {
          conversationId: data?.conversationId,
          userId: user?.uuid,
        });
      };
    }
  }, [currentAppState, socketIo, user?.uuid, data?.conversationId]);
  useEffect(() => {
    const backAction = () => {
      clearAudioCache(); // Clear the audio cache when the app goes to background or inactive state

      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace(routes.tabs.chat as Href);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
  return (
    <View className="flex flex-row items-center gap-2 border-b border-gray-200 px-3 py-2 ">
      <TouchableOpacity
        onPress={async () => {
          // here we are leaving the conversation
          socketIo?.emit('leave_conversation', {
            conversationId: data?.conversationId,
            userId: user?.uuid,
          });
          router.replace(routes.tabs.chat as Href);
          router.setParams({
            conversationId: undefined,
            userId: undefined,
            postId: undefined,
          });
          stop(); // Stop any currently playing audio when leaving the chat
        }}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
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
            <Image
              source={{ uri: data?.profileImage }}
              resizeMode="cover"
              className="h-full w-full rounded-full" // Use a default image or placeholder if needed
            />
          ) : (
            <View className="flex h-12  w-12 items-center justify-center rounded-full bg-primary">
              <Text className=" font-poppinsMedium text-2xl text-white">
                {getInitials(`${data?.firstName} ${data?.lastName}`)}
              </Text>
            </View>
          )}
        </View>
        <View className="">
          <Text className="text-xl font-semibold text-black">{data?.fullName}</Text>
          {status ? (
            <View className="flex-row items-center gap-2">
              <Text className={cn('font-poppinsMedium text-green-500')}>Online</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      {/* <TouchableOpacity>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

export default Header;
