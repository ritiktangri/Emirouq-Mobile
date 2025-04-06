/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import DefaultTextInput from '../common/DefaultTextInput';
import { View } from '../common/View';
import Render from './render';
import { useConversation } from '~/context/ConversationContext';
import { useAuth } from '~/context/AuthContext';
import { useGlobalSearchParams } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useGetConversations } from '~/hooks/chats/query';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';

export default function Chat() {
  const params = useGlobalSearchParams();
  const { createConversationHandler } = useConversation();
  const { user } = useAuth();
  //here we check if the conversation exists, if not we create it
  //and then we get the conversation list
  const checkConversation = async () => {
    if (!params?.conversationId && params?.uuid && params?.userId) {
      await createConversationHandler({
        body: {
          users: [params?.userId, user?.uuid],
          postId: params?.uuid,
        },
      });
    }
  };
  useEffect(() => {
    checkConversation();
  }, [params?.conversationId]);

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch } =
    useGetConversations();

  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['conversation', ''] });
    refetch();
  }, [queryClient, refetch]);

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

      {isLoading ? (
        <></>
      ) : (
        <FlatList
          data={data?.pages.map((page: any) => page?.data).flat() || []}
          keyExtractor={(item) => item?.uuid?.toString()}
          renderItem={({ item }) => <Render item={item} />}
          ListEmptyComponent={() => <View className="flex-1 items-center justify-center"></View>}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator color="#000" size="small" className="my-2" />
            ) : null
          }
        />
      )}
    </View>
  );
}
