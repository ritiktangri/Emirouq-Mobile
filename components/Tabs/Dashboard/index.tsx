/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import Search from './Search';
import { useGetCategory } from '~/hooks/category/query';
import { useGetPosts } from '~/hooks/post/query';
import { queryClient } from '~/app/_layout';
import { useAuth } from '~/context/AuthContext';
import Header from './NewUi/header';
import Categories from './NewUi/categorySection';
import RecommendedSection from './NewUi/recommendationSection';

const Dashboard = () => {
  const { user } = useAuth();
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
  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Header user={user} />
        <Categories data={category?.pages.map((page: any) => page?.data).flat() || []} />
        <RecommendedSection handleRefresh={handleRefresh} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
