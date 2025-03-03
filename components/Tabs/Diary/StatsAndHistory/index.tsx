import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import StatsView from './StatsView';
import TradeHistory from './TradeHistory';
import { Feather } from '@expo/vector-icons';
import { DefaultText as Text } from '~/components/common/DefaultText';

const StatsAndHistory = () => {
  const [activeTab, setActiveTab] = useState('Stats');
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View>
      <TouchableOpacity
        className="m-3 flex-row items-center justify-between"
        onPress={() => setIsExpanded(!isExpanded)}>
        <Text className="text-[#B0B0B0]">View More</Text>
        <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="#B0B0B0" />
      </TouchableOpacity>
      {isExpanded ? (
        <>
          <View className="px-4 pb-4">
            <View className="flex-row justify-around">
              {['Stats', 'Trade History'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className="flex-1 items-center">
                  <Text
                    className={`text-md font-interMedium ${
                      activeTab === tab ? 'text-primary' : 'text-gray-400'
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
                  width: '50%',
                  backgroundColor: '#3B82F6',
                  position: 'absolute',
                  left: activeTab === 'Stats' ? '0%' : '50%',
                }}
              />
            </View>
          </View>
          <View>
            {activeTab === 'Stats' ? (
              <StatsView />
            ) : activeTab === 'Trade History' ? (
              <TradeHistory />
            ) : null}
          </View>
        </>
      ) : null}
    </View>
  );
};

export default StatsAndHistory;
