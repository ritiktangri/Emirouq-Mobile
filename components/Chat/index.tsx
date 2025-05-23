/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Platform, RefreshControl } from 'react-native';
import DefaultTextInput from '../common/DefaultTextInput';
import { View } from '../common/View';
import Render from './render';
import { useAuth } from '~/context/AuthContext';
import { useCallback } from 'react';
import { useGetConversations } from '~/hooks/chats/query';
import theme from '~/utils/theme';
import Loading from './loading';
import LoggedOutView from './loggedOutView';
import NoData from '../common/NoData';
import { i18n } from '~/utils/i18n';
import { useLocale } from '~/context/LocaleContext';
import { queryClient } from '~/app/_layout';

// Define a type for your conversation data (replace with your actual type)
interface Conversation {
  uuid: string;
  // Add other properties of your conversation object here
  [key: string]: any; // Allows for other dynamic properties
}

export default function Chat() {
  const { locale } = useLocale();
  const { user } = useAuth();
  const {
    isFetching,
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  }: any = useGetConversations();
  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['conversation'] });
    refetch();
  }, [refetch, queryClient]);

  if (!user?.uuid) {
    return <LoggedOutView />;
  }
  const conversations: Conversation[] =
    (data?.pages && !!data?.pages?.length && data?.pages?.map((page: any) => page?.data).flat()) ||
    [];

  return (
    <View className="flex-1 bg-white">
      <View className="m-3">
        <DefaultTextInput
          prefix={<Ionicons name="search" size={20} color="#6B7280" />}
          placeholder={i18n.t('chat.placeholder')}
          placeholderTextColor="#9CA3AF"
          containerClassName={`w-full text-base rounded-md bg-textInput_bg px-3 ${Platform.OS === 'android' ? 'h-12' : 'py-3'}`}
          textAlign={locale === 'ar' ? 'right' : 'left'}
        />
      </View>

      {isFetching || isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item?.uuid}
          renderItem={({ item }) => <Render item={item} />}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center">
              <NoData title="chat.noData.title" description="chat.noData.description" />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
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
