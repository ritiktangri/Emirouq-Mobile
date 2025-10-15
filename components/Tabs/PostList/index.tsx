import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '~/utils/helper';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { i18n } from '~/utils/i18n';
import { useGetPosts } from '~/hooks/post/query';
import Render from './render';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';

const PostList = () => {
  const router = useRouter();
  const params = useGlobalSearchParams();
  const { isFetching, data, refetch }: any = useGetPosts({
    status: 'active',
    subCategory: params.subCategory,
    category: params.category,
  });
  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['posts'] });

    refetch();
  }, [queryClient, refetch]);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className={cn('flex-row rounded-b-xl', 'bg-primary')}>
        <View className="flex-row items-center justify-between bg-primary p-4">
          <View className="w-[10%]">
            <Ionicons name="chevron-back" size={24} color="white" onPress={() => router.back()} />
          </View>
          <View className="w-[80%] items-center justify-center bg-primary ">
            <Text className=" text-center text-2xl font-semibold capitalize text-white">
              {i18n.t(`home.${params.tag}`)}
            </Text>
          </View>
          <View className="w-[10%]" />
        </View>
      </SafeAreaView>
      <FlatList
        data={data?.pages.map((page: any) => page?.data).flat() || []}
        keyExtractor={(item) => item?.uuid?.toString()}
        renderItem={({ item, index }) => <Render item={item} index={index} />}
        ItemSeparatorComponent={() => <View className="m-1.5" />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PostList;
