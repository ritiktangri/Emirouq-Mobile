/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
import React, { useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useGetCategory } from '~/hooks/category/query';
import { queryClient } from '~/app/_layout';
import { useAuth } from '~/context/AuthContext';
import Header from './NewUi/header';
import Categories from './NewUi/categorySection';
import RecommendedSection from './NewUi/recommendationSection';
import { useGetDashboardPost } from '~/hooks/post/query';
import theme from '~/utils/theme';
import { Text } from '~/components/common/Text';
import { ActivityIndicator } from 'react-native-paper';

const Dashboard = () => {
  const { user } = useAuth();
  const { priceRange, selectedCategory, selectedSorting, keyword } = useAuth();
  const { data: category, refetch: categoryRefetch }: any = useGetCategory();

  const { data: dashboardPost, isFetching, refetch: dashboardRefetch }: any = useGetDashboardPost();

  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['dashboard-posts', ''] });
    queryClient.removeQueries({ queryKey: ['category'] });

    categoryRefetch();
    dashboardRefetch();
  }, [queryClient, categoryRefetch, categoryRefetch]);
  if (isFetching) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={30} color="#FF5722" />
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        className="flex-1"
        showsVerticalScrollIndicator={false}>
        <Header user={user} />
        <Categories data={category?.pages.map((page: any) => page?.data).flat() || []} />
        <RecommendedSection data={dashboardPost?.data || []} user={user?.uuid} />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
