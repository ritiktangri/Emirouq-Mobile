'use client';

import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Keyboard,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from '../common/View';
import { Text } from '../common/Text';
import { Ionicons } from '@expo/vector-icons';
import { Href, router } from 'expo-router';
import { queryClient } from '~/app/_layout';
import { routes } from '~/utils/routes';

export default function SearchScreen() {
  const categoryQuery = queryClient.getQueriesData({ queryKey: ['category'] });
  const categoryData: any = categoryQuery.length ? categoryQuery[0][1] : null;

  const [keyword, setKeyword] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from AsyncStorage
  const loadSearchHistory = async () => {
    try {
      const stored = await AsyncStorage.getItem('searchKeyword');
      if (stored) {
        setSearchHistory(JSON.parse(stored));
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const saveSearchKeyword = async (text: string) => {
    if (!text.trim()) return;

    try {
      const stored = await AsyncStorage.getItem('searchKeyword');
      let keywords: string[] = stored ? JSON.parse(stored) : [];

      // Remove existing occurrence if already present
      keywords = keywords.filter((k) => k !== text);

      // Add new keyword at the top
      keywords.unshift(text);

      // Keep only latest 10 searches
      keywords = keywords.slice(0, 10);

      await AsyncStorage.setItem('searchKeyword', JSON.stringify(keywords));
      setSearchHistory(keywords);
    } catch (error) {}
  };

  const removeSearchItem = async (itemToRemove: string) => {
    try {
      const updatedHistory = searchHistory.filter((item) => item !== itemToRemove);
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem('searchKeyword', JSON.stringify(updatedHistory));
    } catch (error) {}
  };

  const clearAllSearchHistory = async () => {
    try {
      setSearchHistory([]);
      await AsyncStorage.removeItem('searchKeyword');
    } catch (error) {}
  };

  const handleSearchSubmit = async () => {
    if (keyword.trim()) {
      await saveSearchKeyword(keyword.trim());
      setIsFocus(false);
      Keyboard.dismiss();
      router.push({
        pathname: routes.tabs.post_list,
        params: { tag: 'search', keyword: keyword.trim() },
      } as Href);
    }
  };

  const handleHistoryItemPress = (item: string) => {
    setKeyword(item);
    setIsFocus(false);
    Keyboard.dismiss();
    router.push({
      pathname: routes.tabs.post_list,
      params: { tag: 'search', keyword: item.trim() },
    } as Href);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View className="flex-row items-center gap-2 px-4 py-4">
          <TouchableOpacity
            className=""
            onPress={() => {
              router.back();
              // Handle back navigation
            }}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="font-poppinsMedium text-xl text-black">Search</Text>
        </View>

        {/* Search Bar */}
        <View className="mb-6 px-4">
          <View className="flex-row items-center space-x-3">
            <View className="flex-1 flex-row items-center rounded-lg border border-gray-200 px-3 py-3">
              <Text className="mr-3 text-gray-400">🔍</Text>
              <TextInput
                placeholder="Find Cars, Mobiles and more"
                className="flex-1 font-interMedium text-gray-700"
                placeholderTextColor="#9CA3AF"
                value={keyword}
                onChangeText={(text) => {
                  setKeyword(text);
                  if (text === '') setIsFocus(false);
                }}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onSubmitEditing={handleSearchSubmit}
                returnKeyType="search"
              />
            </View>
          </View>
        </View>

        {/* Recent Search - Only show when not focused and has history */}
        {searchHistory.length > 0 && (
          <View className="mb-4 px-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="font-poppinsMedium text-lg text-black">Recent search</Text>
              <TouchableOpacity onPress={clearAllSearchHistory}>
                <Text className="font-interMedium text-red-500">Clear all</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-3">
              {searchHistory.slice(0, 5).map((search, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleHistoryItemPress(search)}
                  className="flex-row items-center justify-between py-2">
                  <View className="flex-1 flex-row items-center">
                    <Text className="mr-3 text-gray-400">🕐</Text>
                    <Text className="flex-1 font-interMedium text-gray-700">{search}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeSearchItem(search)} className="p-1">
                    <Text className="text-gray-400">✕</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Popular Categories */}
        <View className="px-4">
          <Text className=" font-poppinsMedium text-lg text-black">Popular Categories</Text>
          <View className="mt-5 gap-4">
            {categoryData?.pages
              ?.map((i: any) => i?.data)
              ?.flat()
              ?.slice(0, 4)
              .map((category: any, index: any) => (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: routes.tabs.category,
                      params: { category: category.uuid },
                    } as Href);
                  }}
                  key={category.uuid}
                  className="flex-row items-center justify-between border-b border-gray-100 ">
                  <Text className="font-interMedium text-gray-700">{category.title}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
