/* eslint-disable import/order */
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { pin } from '~/image';
import Tabs from './tabs';
import RecentTable from './recentTable';
import OpenPositions from './openPositions';
import { cn } from '~/utils/helper.utils';

const Trades = () => {
  const [tabs, setTabs] = useState('recentTrades');
  const renderTable: any = {
    recentTrades: <RecentTable type="close" />,
    openPositions: <OpenPositions type="open" />,
  };
  return (
    <View className="mx-2 flex-1">
      <View
        className={cn(
          'flex-1 flex-col gap-4 rounded-lg p-7 dark:border-0 dark:bg-dashboard_card',
          'border-gray-300 bg-white dark:border-[1px]'
        )}>
        <View className="flex-row items-center gap-1">
          <Text className={cn('font-poppinsMedium text-sm dark:text-dashboard_card_text')}>
            Markets{' '}
          </Text>
          <Image source={pin} className="h-4 w-4" />
        </View>
        <Tabs
          state={tabs}
          setState={setTabs}
          list={[
            { id: 1, title: 'Recent Trades', key: 'recentTrades' },
            { id: 2, title: 'Open Positions', key: 'openPositions' },
          ]}
        />
        {renderTable[tabs]}
      </View>
    </View>
  );
};

export default Trades;
