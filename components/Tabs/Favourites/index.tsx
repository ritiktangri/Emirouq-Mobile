import { View, Text, FlatList, RefreshControl, ActivityIndicator, Image } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import GlobalHeader from '~/components/GlobalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '~/utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { i18n } from '~/utils/i18n';
import { queryClient } from '~/app/_layout';
import theme from '~/utils/theme';
import { useGetFavouritePosts } from '~/hooks/post/query';
import Render from './render';
import { noData } from '~/image';
import { useAuth } from '~/context/AuthContext';

const Favourites = () => {
  const { city } = useAuth();
  const {
    isFetching,
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  }: any = useGetFavouritePosts(city);

  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['favourite_posts', city] });

    refetch();
  }, [queryClient, refetch, city]);

  if (isFetching) {
    return <View className="flex-1 bg-white"></View>;
  }
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className={cn('flex-row rounded-b-xl', 'bg-primary')}>
        <View className="flex-row items-center justify-between bg-primary p-4">
          <View className="w-[10%]">
            <Ionicons name="chevron-back" size={24} color="white" onPress={() => router.back()} />
          </View>
          <View className="w-[80%] items-center justify-center bg-primary ">
            <Text className=" text-center text-2xl font-semibold capitalize text-white">
              {i18n.t('favourites.favourites')}
            </Text>
          </View>
          <View className="w-[10%]" />
        </View>
      </SafeAreaView>
      <View className="flex-1 bg-white">
        <FlatList
          data={data?.pages.map((page: any) => page?.data).flat() || []}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item: any) => item?.uuid?.toString()}
          renderItem={({ item }) => <Render item={item} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            margin: 12,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[theme.colors.primary]}
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
            />
          }
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator color="#000" size="small" className="my-2" />
            ) : null
          }
          ListEmptyComponent={() => (
            <View className="mt-10 flex-1 items-center justify-center">
              <Image source={noData} className=" flex h-56 w-56" />

              <Text className="font-interMedium text-xl">No Product has been added</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Favourites;
