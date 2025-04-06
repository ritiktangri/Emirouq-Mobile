/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import DefaultTextInput from '../common/DefaultTextInput';
import { View } from '../common/View';
import Render from './render';
import { useConversation } from '~/context/ConversationContext';
import { useAuth } from '~/context/AuthContext';
import { useGlobalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function Chat() {
  const params = useGlobalSearchParams();
  const { createConversationHandler, getConversationListHandler, conversationList } =
    useConversation();
  const { user } = useAuth();
  //here we check if the conversation exists, if not we create it
  //and then we get the conversation list
  const checkConversation = async (signal: any) => {
    console.log(1);
    if (!params?.conversationId && params?.uuid && params?.userId) {
      await createConversationHandler({
        body: {
          users: [params?.userId, user?.uuid],
          postId: params?.uuid,
        },
      });
    }
    getConversationListHandler(
      signal,
      0,
      10,
      '',
      () => {},
      () => {}
    );
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    checkConversation(signal);
    return () => {
      controller.abort();
    };
  }, [params, user]);
  return (
    <View className="flex-1 bg-white">
      <View className="m-3">
        <DefaultTextInput
          prefix={<Ionicons name="search" size={20} color="#6B7280" />}
          placeholder="Search chats..."
          placeholderTextColor="#9CA3AF"
          containerClassName="  w-full text-base rounded-md bg-textInput_bg p-3 "
        />
      </View>

      <FlatList
        data={conversationList || []}
        keyExtractor={(item) => item?.uuid?.toString()}
        renderItem={({ item }) => <Render item={item} />}
        ListEmptyComponent={() => <View className="flex-1 items-center justify-center"></View>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
