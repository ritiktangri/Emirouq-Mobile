/* eslint-disable import/order */
/* eslint-disable no-unused-expressions */
import React, { useCallback } from 'react';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
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
import { noData } from '~/image';

const Dashboard = () => {
  const { user } = useAuth();
  const { priceRange, selectedCategory, selectedSorting, keyword, city } = useAuth();
  const { data: category, refetch: categoryRefetch }: any = useGetCategory();

  const {
    data: dashboardPost,
    isFetching,
    refetch: dashboardRefetch,
  }: any = useGetDashboardPost(city);

  const handleRefresh = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['dashboard-posts', city] });
    queryClient.removeQueries({ queryKey: ['category'] });

    categoryRefetch();
    dashboardRefetch();
  }, [queryClient, categoryRefetch, dashboardRefetch, city]);
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
        {isFetching ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size={30} color="#FF5722" />
          </View>
        ) : dashboardPost?.data?.length > 0 ? (
          <RecommendedSection data={dashboardPost?.data || []} user={user?.uuid} />
        ) : (
          <View className="mt-10 flex-1 items-center justify-center">
            <Image source={noData} className=" h-56 w-56" />
            <Text className="mt-4 font-interMedium text-lg text-gray-500">
              No recommendations found in this city
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Dashboard;
