/* eslint-disable import/order */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { cn } from '~/utils/helper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Product from './product';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import { useGetConversations, useGetMessages } from '~/hooks/chats/query';
import Header from './header';
import { useAuth } from '~/context/AuthContext';
import { useCreateConversation } from '~/hooks/chats/mutation';
import { queryClient } from '~/app/_layout';

const ChatScreen = () => {
  const params: any = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { socketIo, user, onlineUsers } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const flatListRef: any = useRef(null);
  const { data }: any = useGetMessages(params?.conversationId);
  const sendMessage = () => {};
  const { refetch }: any = useGetConversations('', false);
  const createConversation = useCreateConversation();
  const router = useRouter();
  const checkConversation = async () => {
    if (params?.conversationId) {
      return;
    }
    try {
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
        refetch();
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
      // Display an error message to the user (e.g., using a toast or alert)
      // Consider using a dedicated error handling component.
    }
  };
  useEffect(() => {
    checkConversation();
  }, [params?.conversationId, params?.postId, params?.userId, user?.uuid]); // Correct dependency array

  const renderItem = useCallback(
    ({ item }: any) => (
      <View
        className={`mb-2 max-w-[70%] rounded-lg px-3 py-2 ${
          item.sender === 'user' ? 'self-end bg-primary' : 'self-start bg-gray-200'
        }`}>
        <Text
          className={cn(
            item.sender === 'user' ? 'text-right text-white' : 'text-left',
            'text-base'
          )}>
          {item.text}
        </Text>
      </View>
    ),
    []
  );
  useEffect(() => {
    if (socketIo?.connected && params?.conversationId && user?.uuid) {
      socketIo.emit('conversationRoom', {
        userId: user?.uuid,
        conversationId: params?.conversationId,
      });
    }

    return () => {
      socketIo?.off('conversationRoom');
    };
  }, [socketIo, params?.conversationId, user]);
  console.log(params?.conversationId, 'params?.conversationId');
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
            <FlatList
              ref={flatListRef}
              data={data?.data || []}
              renderItem={renderItem}
              keyExtractor={(item: any) => item?.uuid?.toString()}
              inverted
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 16,
                flexGrow: 1,
                justifyContent: 'flex-end',
              }}
              onContentSizeChange={() => {
                if (flatListRef.current) {
                  flatListRef.current.scrollToOffset({ offset: 0, animated: true });
                }
              }}
              onLayout={() => {
                if (flatListRef.current) {
                  flatListRef.current.scrollToOffset({ offset: 0, animated: true });
                }
              }}
            />

            <View className="flex-row items-center  border-t border-gray-200 px-4 py-4" style={{}}>
              <TouchableOpacity>
                <Entypo name="attachment" size={24} color="black" />
              </TouchableOpacity>
              <DefaultTextInput
                className="w-full rounded-2xl bg-[#F0F0F0] px-3 py-4"
                containerClassName="mr-2 max-h-24 flex-1 text-black rounded-full bg-white px-4 py-2 text-base"
                placeholder="Type a message..."
                value={newMessage}
                onChangeText={setNewMessage}
                multiline
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity
                className="h-12 w-12 items-center justify-center rounded-full "
                onPress={sendMessage}>
                <Ionicons name="send" size={30} className="!text-primary" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
