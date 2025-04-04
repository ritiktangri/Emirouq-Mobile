/* eslint-disable import/order */
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react'; // Import useCallback
import { Ionicons } from '@expo/vector-icons';
import AdsList from './AdsList';
import { usePosts } from '~/context/PostContext';

const ManageAds = () => {
  const { status, setStatus } = usePosts();

  const tabs = [
    {
      id: 1,
      name: 'All Ads',
      value: '',
    },
    {
      id: 2,
      name: 'Drafts',
      value: 'draft',
    },
    {
      id: 3,
      name: 'Active',
      value: 'active',
    },
    {
      id: 4,
      name: 'Pending',
      value: 'pending',
    },
  ];

  const HorizontalTabs = ({ tabs, selectedTab, onTabPress }: any) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="min-h-12 flex-row p-4"
        contentContainerStyle={{ alignItems: 'center' }}>
        {tabs?.map((tab: any) => (
          <TouchableOpacity
            key={tab?.id}
            onPress={() => onTabPress(tab?.value)}
            className={`mx-2 rounded-full px-4 py-2 ${
              selectedTab === tab?.value ? 'border border-orange-500' : 'bg-gray-200'
            }`}>
            <Text className={`${selectedTab === tab?.value ? 'text-orange-500' : 'text-gray-700'}`}>
              {tab?.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // Use useCallback to memoize the setStatus function passed to HorizontalTabs
  const handleTabPress = useCallback(
    (tabValue: any) => {
      setStatus(tabValue);
    },
    [setStatus]
  ); // Dependency array includes setStatus

  return (
    <View className="flex-1 justify-center">
      <View className="">
        <HorizontalTabs
          tabs={tabs}
          selectedTab={status}
          onTabPress={handleTabPress} // Pass the memoized function
        />
      </View>
      <View className="flex-row items-center justify-between border-b-[0.5px] border-t-[0.5px] border-gray-300 p-2">
        <TouchableOpacity onPress={() => {}} className="flex-row items-center">
          <Ionicons name="list-outline" size={20} color="gray" />
          <Text className="ml-2 text-gray-700">Sort by: Date</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="filter-outline" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <AdsList />
    </View>
  );
};

export default ManageAds;
