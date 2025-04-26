/* eslint-disable import/order */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Product from './product';
import { saveMessageCache, useGetMessages } from '~/hooks/chats/query';
import Header from './header';
import { useAuth } from '~/context/AuthContext';
import { useCreateConversation } from '~/hooks/chats/mutation';
import { queryClient } from '~/app/_layout';
import Chat from './chat';

const ChatScreen = () => {
  const params: any = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { socketIo, user, onlineUsers } = useAuth();

  const { data, refetch }: any = useGetMessages(params?.conversationId);
  useEffect(() => {
    if (params?.conversationId) {
      queryClient.removeQueries({ queryKey: ['messages', ''] });
      refetch();
    }
    return () => {
      queryClient.removeQueries({ queryKey: ['messages', ''] });
    };
  }, [params?.conversationId]);
  const sendMessage = (message: any, cb: any) => {
    if (message?.trim() === '') {
      return;
    }

    //save the message to the cache
    saveMessageCache({
      message,
      user: user?.uuid,
      conversationId: params?.conversationId,
      type: 'text',
    });

    socketIo?.emit('message', {
      details: JSON.parse(params?.details),
      conversationId: params?.conversationId,
      message,
      senderId: user?.uuid,
      // this is to check if the user is the sender or receiver
      receiverId: params?.receiverId === user?.uuid ? params?.userId : params?.receiverId,
      type: 'text',
    });
    cb();
  };
  const createConversation = useCreateConversation();
  const router = useRouter();
  const checkConversation = async () => {
    if (params?.conversationId) {
      return;
    }
    try {
      // Check if the conversation already exists
      const res: any = await createConversation.mutateAsync({
        body: {
          users: [params?.userId, user?.uuid],
          postId: params?.postId,
        },
      });
      if (!res?.isExist) {
        router.setParams({
          conversationId: res?.data?.uuid,
        });
        // this is to update the conversationId in the params
        // as well as the queryClient

        queryClient.setQueryData(['singlePost', params?.postId], (oldData: any) => {
          if (oldData) {
            return {
              ...oldData,
              conversationId: res?.data?.uuid,
            };
          }
          return oldData;
        });
        //This prevents the function from running again and again
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };
  useEffect(() => {
    checkConversation();
  }, [params?.conversationId, params?.postId, params?.userId, user?.uuid]); // Correct dependency array

  useEffect(() => {
    if (socketIo?.connected && params?.conversationId && user?.uuid) {
      socketIo.emit('join_conversation', {
        userId: user?.uuid,
        conversationId: params?.conversationId,
      });
    }

    return () => {
      if (socketIo?.connected) socketIo?.off('join_conversation');
    };
  }, [socketIo, params?.conversationId, user?.uuid]);

  useEffect(() => {
    if (socketIo?.connected) {
      socketIo.on('message', ({ message }: any) => {
        //save the message to the cache
        saveMessageCache(message);
      });
    }
    return () => {
      socketIo?.off('message');
    };
  }, [socketIo]);
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-white">
      <Header data={params} status={onlineUsers?.includes(params?.userId)} />
      <Product product={params?.uuid ? params : {}} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom : 0}>
        {createConversation?.isPending ? (
          <Text>Loading....</Text>
        ) : (
          <View className="flex-1">
            <Chat
              data={data?.pages.map((page: any) => page?.data).flat()}
              sendMessage={sendMessage}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
