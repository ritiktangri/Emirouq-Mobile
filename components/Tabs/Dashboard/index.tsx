/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Category from './Category';
import Featured from './Featured';
import HotDeals from './HotDeals';
import Search from './Search';
import UnlockFeature from './UnlockFeature';
import { useGetCategory } from '~/hooks/category/query';
import { useGetPosts } from '~/hooks/post/query';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';
import FeaturedListLoading from './Featured/loading';

const Dashboard = () => {
  const {
    isLoading: categoryLoading,
    data: category,
    refetch: categoryRefetch,
  }: any = useGetCategory();
  const {
    isFetching: featuredPostFetching,
    loading: featuredPostLoading,
    data: featurePost,
    refetch: featurePostRefetch,
  }: any = useGetPosts('');
  const {
    isFetching: hotDealPostFetching,
    loading: hotDealPostLoading,
    data: hotDealPost,
    refetch: hotDealRefetch,
  }: any = useGetPosts('');
  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['posts', ''] });
    queryClient.removeQueries({ queryKey: ['category'] });
    queryClient.removeQueries({ queryKey: ['posts', ''] });

    featurePostRefetch();
    categoryRefetch();
    hotDealRefetch();
  }, [queryClient, categoryRefetch, categoryRefetch]);

  const components = useMemo(
    () => [
      categoryLoading ? (
        <></>
      ) : (
        <Category data={category?.pages.map((page: any) => page?.data).flat() || []} />
      ),
      featuredPostLoading || featuredPostFetching ? (
        <FeaturedListLoading />
      ) : (
        <Featured data={featurePost?.pages.map((page: any) => page?.data).flat() || []} />
      ),
      hotDealPostLoading || hotDealPostFetching ? (
        <FeaturedListLoading />
      ) : (
        <HotDeals data={hotDealPost?.pages.map((page: any) => page?.data).flat() || []} />
      ),
      <UnlockFeature />,
    ],
    [
      category?.pages,
      featurePost?.pages,
      categoryLoading,
      featuredPostLoading,
      hotDealPost?.pages,
      hotDealPostLoading,
      hotDealPostFetching,
      featuredPostFetching,
    ]
  );
  return (
    <View className="flex-1 bg-white ">
      <FlatList
        data={components}
        ListHeaderComponentClassName="m-4"
        ListHeaderComponent={<Search />}
        renderItem={({ item }) => <View className="flex-1">{item}</View>}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
      />
    </View>
  );
};

export default Dashboard;
