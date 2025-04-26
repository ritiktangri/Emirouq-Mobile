import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import GlobalHeader from '~/components/GlobalHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '~/utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { i18n } from '~/utils/i18n';
import { queryClient } from '~/app/_layout';
import theme from '~/utils/theme';
import { useGetFavouritePosts } from '~/hooks/post/query';
import { useAuth } from '~/context/AuthContext';
import Render from './render';

const Favourites = () => {
  const {
    isFetching: favouritePostsFetching,
    loading: favouritePostsLoading,
    data: favouritePosts,
    refetch: favouritePostsRefetch,
  }: any = useGetFavouritePosts();

  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['posts', ''] });

    favouritePostsRefetch();
  }, [queryClient, favouritePostsRefetch]);

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
        {favouritePostsLoading || favouritePostsFetching ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={favouritePosts?.pages.map((page: any) => page?.data).flat() || []}
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
          />
        )}
      </View>
    </View>
  );
};

export default Favourites;
