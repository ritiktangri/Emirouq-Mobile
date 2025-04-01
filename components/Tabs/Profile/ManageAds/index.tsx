import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Entypo, Ionicons } from '@expo/vector-icons';
import AdsList from './AdsList';

const ManageAds = () => {
  const [selectedTab, setSelectedTab] = useState('All Ads');
  const tabs = ['All Ads', 'Drafts', 'Active', 'Pending'];

  const HorizontalTabs = ({ tabs, selectedTab, onTabPress }: any) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="min-h-12 flex-row p-4"
        contentContainerStyle={{ alignItems: 'center' }} // Ensure proper alignment
      >
        {tabs.map((tab: any) => (
          <TouchableOpacity
            key={tab}
            onPress={() => onTabPress(tab)}
            className={`mx-2 rounded-full px-4 py-2 ${
              selectedTab === tab ? 'border border-orange-500' : 'bg-gray-200'
            }`}>
            <Text className={`${selectedTab === tab ? 'text-orange-500' : 'text-gray-700'}`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View className="flex-1 justify-center">
      <View className="">
        <HorizontalTabs
          tabs={tabs}
          selectedTab={selectedTab}
          onTabPress={(tab: any) => setSelectedTab(tab)}
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
      {/*Ads List */}
      <AdsList />
    </View>
  );
};

export default ManageAds;
