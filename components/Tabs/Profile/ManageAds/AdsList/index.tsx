/* eslint-disable import/order */
import { View, FlatList } from 'react-native';
import React from 'react';
import { usePosts } from '~/context/PostContext';
import Render from './render';

const AdsList = () => {
  const { posts, loading } = usePosts();
  return (
    <View className="flex-1">
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Render item={item} />}
        keyExtractor={(item) => item?.uuid?.toString()}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default AdsList;
