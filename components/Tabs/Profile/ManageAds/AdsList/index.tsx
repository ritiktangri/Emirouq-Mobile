/* eslint-disable import/order */
import { View, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback } from 'react';
import Render from './render';
import { useGetPosts } from '~/hooks/post/query';
import { usePosts } from '~/context/PostContext';
import { Text } from '~/components/common/Text';
import { RefreshControl } from 'react-native-gesture-handler';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';
import Loading from './loading';
import { useAuth } from '~/context/AuthContext';

const AdsList = () => {
  const { status } = usePosts();
  const { user }: any = useAuth();
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch }: any =
    useGetPosts('', status, user?.uuid);
  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['posts', '', status] });
    refetch();
  }, [queryClient, refetch, status]);

  if (isLoading) {
    return (
      <View className="flex-1">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <Loading key={index} />
          ))}
      </View>
    );
  }
  return (
    <View className="flex-1">
      <FlatList
        data={data?.pages.map((page: any) => page?.data).flat() || []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Render item={item} />}
        keyExtractor={(item) => item?.uuid?.toString()}
        contentContainerStyle={{ padding: 10 }}
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
        ListEmptyComponent={() => <Text>No Data</Text>}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator color="#000" size="small" className="my-2" />
          ) : null
        }
      />
    </View>
  );
};

export default AdsList;
