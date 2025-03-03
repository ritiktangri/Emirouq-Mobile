import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toCurrency } from '~/utils/helper.utils';
import StatsDetailsView from './StatsDetailsView';
import TagsView from './TagsView';
import NotesView from '~/components/Drawer/SingleTrade/StatsView/NotesView';
import { DefaultText as Text } from '~/components/common/DefaultText';

const StatsView = ({ data }: any) => {
  const [activeTab, setActiveTab] = useState('Stats');
  return (
    <View>
      {/* PnL Card */}
      <View className="dark: flex flex-col justify-center gap-3 rounded-lg border-gray-800 bg-white px-4  py-2 dark:border dark:bg-dashboard_card">
        <View className="flex flex-row items-center justify-between gap-1">
          <MaterialCommunityIcons name="bank-outline" size={24} color="#12B981" />
          <View className="ml-2 flex-1 ">
            <View className="flex-col gap-2">
              <Text className="font-poppinsMedium text-lg text-gray-500 dark:text-[#BFBFBF]">
                Net P&L
              </Text>
              <Text className={`font-poppinsMedium text-xl dark:text-white`}>
                {toCurrency(data?.[data?.calculationMethod]?.netPnl)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Tabs */}
      <View className="p-4">
        <View className="flex-row justify-around">
          {['Stats', 'Tags', 'Notes'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 items-center">
              <Text
                className={`font-interMedium text-lg ${
                  activeTab === tab ? 'text-primary' : 'dark:text-gray-400'
                }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            marginTop: 8,
            height: 2,
            backgroundColor: '#374151',
            position: 'relative',
          }}>
          <View
            style={{
              height: '100%',
              width: '33.33%',
              backgroundColor: '#3B82F6',
              position: 'absolute',
              left: activeTab === 'Stats' ? '0%' : activeTab === 'Tags' ? '33.33%' : '66.66%', // Move underline based on active tab
            }}
          />
        </View>
      </View>
      {/* VIEWS */}
      <View>
        {activeTab === 'Stats' ? (
          <StatsDetailsView data={data} />
        ) : activeTab === 'Tags' ? (
          <TagsView data={data} />
        ) : activeTab === 'Notes' ? (
          // <NotesView data={data} />
          <></>
        ) : null}
      </View>
    </View>
  );
};

export default StatsView;
