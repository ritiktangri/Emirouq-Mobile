/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
import React, { useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Featured from './Featured';
import HotDeals from './HotDeals';
import Search from './Search';
import { useGetCategory } from '~/hooks/category/query';
import { useGetPosts } from '~/hooks/post/query';
import theme from '~/utils/theme';
import { queryClient } from '~/app/_layout';
import FeaturedListLoading from './Featured/loading';
import Recent from './Recent';
import Recommended from './Recommended';
import { useAuth } from '~/context/AuthContext';

const Dashboard = () => {
  const { priceRange, selectedCategory, selectedSorting, keyword } = useAuth();
  const {
    isLoading: categoryLoading,
    data: category,
    refetch: categoryRefetch,
  }: any = useGetCategory();
  const {
    isFetching: recentPostFetching,
    loading: recentPostLoading,
    data: recentPost,
    refetch: recentPostRefetch,
  }: any = useGetPosts(
    keyword,
    'active',
    null,
    'getPostList',
    priceRange,
    selectedCategory,
    'newest'
  );
  const {
    isFetching: featuredPostFetching,
    loading: featuredPostLoading,
    data: featurePost,
    refetch: featurePostRefetch,
  }: any = useGetPosts(
    keyword,
    'active',
    null,
    'getFeaturedAds',
    priceRange,
    selectedCategory,
    selectedSorting
  );
  const {
    isFetching: hotDealPostFetching,
    loading: hotDealPostLoading,
    data: hotDealPost,
    refetch: hotDealRefetch,
  }: any = useGetPosts(
    keyword,
    'active',
    null,
    'getPostList',
    priceRange,
    selectedCategory,
    selectedSorting
  );
  const {
    isFetching: recommendedPostFetching,
    loading: recommendedPostLoading,
    data: recommendedPost,
    refetch: recommendedPostRefetch,
  }: any = useGetPosts(
    keyword,
    'active',
    null,
    'getPostList',
    priceRange,
    selectedCategory,
    selectedSorting
  );
  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['posts', ''] });
    queryClient.removeQueries({ queryKey: ['category'] });
    queryClient.removeQueries({ queryKey: ['posts', ''] });
    queryClient.removeQueries({ queryKey: ['posts', ''] });

    recentPostRefetch();
    featurePostRefetch();
    categoryRefetch();
    hotDealRefetch();
    recommendedPostRefetch();
  }, [queryClient, categoryRefetch, categoryRefetch, recentPostRefetch, recommendedPostRefetch]);

  const components = useMemo(
    () => [
      // categoryLoading ? (
      //   <></>
      // ) : (
      //   <Category data={category?.pages.map((page: any) => page?.data).flat() || []} />
      // ),
      featuredPostLoading || featuredPostFetching ? (
        <FeaturedListLoading />
      ) : (featurePost?.pages.map((page: any) => page?.data).flat() || [])?.length ? (
        <Featured data={featurePost?.pages.map((page: any) => page?.data).flat() || []} />
      ) : (
        <></>
      ),
      recentPostLoading || recentPostFetching ? (
        <FeaturedListLoading />
      ) : (
        <Recent data={recentPost?.pages.map((page: any) => page?.data).flat() || []} />
      ),
      hotDealPostLoading || hotDealPostFetching ? (
        <FeaturedListLoading />
      ) : (
        <HotDeals data={hotDealPost?.pages.map((page: any) => page?.data).flat() || []} />
      ),
      recommendedPostLoading || recommendedPostFetching ? (
        <FeaturedListLoading />
      ) : (
        <Recommended data={recommendedPost?.pages.map((page: any) => page?.data).flat() || []} />
      ),
      // <UnlockFeature />,
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
      recentPost?.pages,
      recentPostLoading,
      recentPostFetching,
      recommendedPostLoading,
      recommendedPostFetching,
      recommendedPost?.pages,
    ]
  );
  return (
    <View className="flex-1 bg-white">
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
