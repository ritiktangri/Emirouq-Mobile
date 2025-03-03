/* eslint-disable import/order */
import React from 'react';

import { useGlobalSearchParams, useNavigation } from 'expo-router';
import {
  MemoizedDays,
  MemoizedWeeks,
  MemoizedMonths,
  MemoizedSelectPnl,
  MemoizedPrice,
  MemoizedQuantity,
  MemoizedInstrument,
  MemoizedDaysTillExpiration,
  MemoizedRMultiple,
  MemoizedPositionSize,
  MemoizedWinLoss,
  MemoizedTags,
} from './export';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { getPnlValue, dropdowns } from '~/utils/dropdown';
import { useReport } from '~/context/ReportContext';
import Overview from './Overview';

const Analytics = () => {
  const state = useGlobalSearchParams();
  const { selectPnl, setSelectPnl }: any = useReport();
  const navigation = useNavigation();
  const route: any = state?.route?.includes('tags') ? 'tags' : state?.route || 'overview';
  const render: any = {
    overview: <Overview />,
    days: <MemoizedDays />,
    weeks: <MemoizedWeeks />,
    months: <MemoizedMonths />,
    price: <MemoizedPrice />,
    quantity: <MemoizedQuantity />,
    instrument: <MemoizedInstrument />,
    daysTillExpiration: <MemoizedDaysTillExpiration />,
    rMultiple: <MemoizedRMultiple />,
    positionSize: <MemoizedPositionSize />,
    tags: <MemoizedTags />,
    winLoss: <MemoizedWinLoss />,
  };
  return (
    <View className="bg-default_light_bg flex-1 pt-2 dark:bg-black">
      <MemoizedSelectPnl
        containerClassName="mx-4"
        nestedDropdownClassName=""
        right={
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            className=" items-center justify-center rounded-md border-gray-600 border-opacity-20 p-2 dark:border-2 dark:border-drawer">
            <Ionicons name="filter-outline" size={24} className={'dark:!text-white'} />
          </TouchableOpacity>
        }
        options={dropdowns?.filter((item: any) => item.id === '1')?.[0]}
        selected={selectPnl}
        value={getPnlValue[selectPnl]}
        setSelected={setSelectPnl}
      />
      {render[route]}
    </View>
  );
};

export default Analytics;
