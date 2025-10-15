'use client';

import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetCategory, useGetSubCategory } from '~/hooks/category/query';
import { routes } from '~/utils/routes';

function Category() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching }: any =
    useGetCategory();
  const { data: subCategory, isFetching: subCategoryFetching }: any =
    useGetSubCategory(selectedCategory);

  // set default selected category if not set
  useEffect(() => {
    if (!selectedCategory && data?.pages?.[0]?.data?.[0]?.uuid) {
      setSelectedCategory(data.pages[0].data[0].uuid);
    }
  }, [data, selectedCategory]);
  if (isFetching) {
    return (
      <ActivityIndicator
        size="large"
        color="#f97316"
        className="flex-1 items-center justify-center"
      />
    );
  }
  return (
    <View className="flex-1 bg-gray-50">
      <View className="border-b border-gray-200 bg-white px-6 py-4 ">
        <Text className="font-poppinsBold text-2xl text-gray-900">Categories</Text>
        <Text className="mt-1 font-interMedium text-sm text-gray-600">
          Explore products by category
        </Text>
      </View>

      <View className="flex-1 flex-row">
        {/* Left - Category List */}
        <View className="w-2/5 border-r border-gray-200 bg-white">
          <FlatList
            data={data?.pages.flatMap((page: any) => page.data) || []}
            keyExtractor={(item) => item?.uuid}
            renderItem={({ item }) => {
              const isSelected = selectedCategory === item?.uuid;
              return (
                <TouchableOpacity
                  className={`border-b border-gray-100 p-4 ${
                    isSelected ? 'border-l-4 border-l-orange-500 bg-orange-50' : 'bg-white'
                  }`}
                  onPress={() => setSelectedCategory(item?.uuid)}>
                  <Text
                    className={`text-sm ${isSelected ? 'font-poppinsMedium text-orange-700' : 'font-interMedium text-gray-700'}`}>
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
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
          />
        </View>

        {/* Right - Subcategory Grid */}
        <View className="flex-1 ">
          {subCategoryFetching ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#f97316" />
              <Text className="mt-4 text-gray-500">Loading subcategories...</Text>
            </View>
          ) : (
            <FlatList
              data={subCategory?.pages.flatMap((page: any) => page.data) || []}
              keyExtractor={(item, index) => `${item.title}-${index}`}
              numColumns={2}
              className="p-4"
              ListHeaderComponent={() => {
                if (subCategory?.pages?.[0]?.data?.length) {
                  return (
                    <View className="mb-4 flex flex-row items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm ">
                      <Ionicons name="search" size={14} color="#9CA3AF" className="" />
                      <TextInput
                        placeholder="Search subcategories..."
                        className="leading-0 flex-1  text-gray-700"
                        onChangeText={(text) => {
                          // Implement search functionality if needed
                        }}
                      />
                    </View>
                  );
                }
                return null;
              }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="mb-4 w-[48%] items-center rounded-lg  p-4 "
                  style={{
                    boxShadow: [
                      {
                        offsetX: 0,
                        offsetY: 1,
                        blurRadius: 3,
                        color: 'rgba(0, 0, 0, 0.3)',
                      },
                    ],
                  }}
                  onPress={() => {
                    router.push({
                      pathname: routes.tabs.post_list,
                      params: { tag: 'search', subCategory: item.uuid },
                    } as Href);
                  }}>
                  <Text className="text-center text-sm font-semibold text-gray-800">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <View className="flex-1 items-center justify-center">
                    <View className="mb-4 h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                      <Text className="text-3xl">📦</Text>
                    </View>
                    <Text className="mb-2 font-poppinsMedium text-lg text-gray-800">
                      No subcategories found
                    </Text>
                    <Text className="px-8 text-center text-sm text-gray-500">
                      Try selecting a different category to see available subcategories.
                    </Text>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

export default Category;
