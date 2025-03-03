/* eslint-disable import/order */
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { singleTradeData } from './data';
import { capitalizeFirstLetter } from '~/utils/helper';
import { Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import TradeHeader from './TradeHeader';
import { executions_active, executions_inactive, stats_active, stats_inactive } from '~/image';
import StatsView from './StatsView';
import ExecutionsView from './ExecutionsView';
import SearchSymbol from '~/components/TradingWidgets/search-symbol';
import Modalize from '~/components/Modalize';
import { useModalize } from 'react-native-modalize';
import { useAuth } from '~/context/AuthContext';
import Header from '~/components/Drawer/header';
import { timezones } from '~/components/Drawer/Timezone/timezone';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useTrade } from '~/context/TradeContext';
import { useLocalSearchParams } from 'expo-router';
import Loading from './loading';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';

const SingleTrade = ({ route }: any) => {
  const [isChartView, setIsChartView] = useState(false);
  const [tab, setTab] = useState(0);
  const { user } = useAuth();
  const [timezone, setTimezone] = useState(user?.timeZone);
  const [keyword, setKeyword] = useState('');
  const { ref, open, close }: any = useModalize();
  const { id } = useLocalSearchParams();
  const { getSingleTrade, singleTrade, singleTradeLoading }: any = useTrade();

  useEffect(() => {
    if (id) {
      getSingleTrade(id);
    }
  }, [id]);

  const data = singleTrade;
  return (
    <View className={cn('flex-1 py-3', 'bg-default_light_bg dark:bg-black')}>
      <Header />

      {singleTradeLoading ? (
        <View className="mx-2 flex-1">
          <Loading />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="">
          <TradeHeader data={data} open={isChartView} setOpen={setIsChartView} />
          {isChartView && (
            <View className={cn('bg-white px-4 dark:bg-[#131B24]')}>
              <View className="my-2">
                <Modalize
                  onClose={close}
                  isExpanded={'timezone'}
                  modalTopOffset={200}
                  ref={ref}
                  isSearch
                  setKeyword={setKeyword}
                  icon={
                    <TouchableOpacity
                      onPress={open}
                      className={cn(
                        'mx-3 flex-row items-center rounded-md  border-[0.5px] px-3 py-2 dark:border-gray-300'
                      )}>
                      <View className="flex-row items-center gap-x-2">
                        <Feather name="clock" size={20} className="text-black dark:!text-white" />
                        <Text className="flex-1 font-interMedium dark:text-white">
                          {timezone || 'Select'}
                        </Text>
                      </View>
                      <Ionicons
                        name="chevron-down"
                        size={24}
                        className="text-black dark:!text-white"
                      />
                    </TouchableOpacity>
                  }
                  title="Select Timezone"
                  onSelect={(value: any) => {
                    setTimezone(value);
                  }}
                  text=""
                  data={[
                    {
                      id: 'timezone',
                      heading: '',
                      data: timezones
                        ?.filter((ite) => ite)
                        ?.slice(0, 15)
                        ?.map((val, idx) => {
                          return {
                            id: idx?.toString(),
                            ...val,
                          };
                        }),
                    },
                  ]}
                />
              </View>
              <View className="h-[50%] w-full">
                <SearchSymbol symbol="" />
              </View>
            </View>
          )}
          <View className="mx-4 mt-4 flex-row justify-between rounded-md  border border-gray-800 p-[3px]">
            <TabView
              onPress={() => {
                setTab(0);
              }}
              title="Stats"
              activeIcon={stats_active}
              inactiveIcon={stats_inactive}
              isActive={tab === 0}
            />
            <TabView
              onPress={() => {
                setTab(1);
              }}
              title="Executions"
              activeIcon={executions_active}
              inactiveIcon={executions_inactive}
              isActive={tab === 1}
            />
          </View>
          <View className="mt-4 bg-white p-4 dark:mt-0 dark:bg-transparent">
            {tab === 0 ? <StatsView data={data} /> : <ExecutionsView data={data} />}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SingleTrade;

const TabView = ({ title, onPress, activeIcon, inactiveIcon, isActive }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-[50%] flex-row items-center justify-center gap-2 rounded-md px-8 py-2.5 ${isActive ? 'bg-[#161B26]' : ''}`}>
      <Image source={isActive ? activeIcon : inactiveIcon} className="h-5 w-5" />
      <Text
        className={`text-center font-semibold text-white ${isActive ? '' : '!text-black dark:!text-white'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
