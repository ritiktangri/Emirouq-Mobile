import { View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ExecutionsDetailedView from '~/components/Drawer/SingleTrade/ExecutionsView/ExecutionsDetailedView';
import NotesView from '~/components/Drawer/SingleTrade/StatsView/NotesView';
import { DefaultText as Text } from '~/components/common/DefaultText';

const ExecutionsView = ({ data }: any) => {
  const [activeTab, setActiveTab] = useState('Executions');
  return (
    <View>
      {/* Tabs */}
      <View className="p-4">
        <View className="flex-row justify-around">
          {['Executions', 'Notes'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 items-center">
              <Text
                className={`text-md font-interMedium ${
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
              width: '50%',
              backgroundColor: '#3B82F6',
              position: 'absolute',
              left: activeTab === 'Executions' ? '0%' : '50%',
            }}
          />
        </View>
      </View>
      <View>
        {activeTab === 'Executions' ? (
          <ExecutionsDetailedView data={data} />
        ) : activeTab === 'Notes' ? (
          // <NotesView data={data} />
          <></>
        ) : null}
      </View>
    </View>
  );
};

export default ExecutionsView;
