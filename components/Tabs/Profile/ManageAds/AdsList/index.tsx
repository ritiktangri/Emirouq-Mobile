/* eslint-disable import/order */
import { View, FlatList } from 'react-native';
import React from 'react';
import Render from './render';
import { useGetPosts } from '~/hooks/post/query';
import { ActivityIndicator } from 'react-native-paper';
import { usePosts } from '~/context/PostContext';

const AdsList = () => {
  const { status } = usePosts();
  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetPosts(
    0,
    10,
    '',
    status
  );

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
