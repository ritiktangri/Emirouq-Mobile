/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useModalize } from 'react-native-modalize';
import Modalize from '~/components/Modalize';
import { getPnlValue, dropdowns } from '~/utils/dropdown';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useDashboard } from '~/context/DashboardContext';
import { cn } from '~/utils/helper.utils';

const SelectPnl = () => {
  const { setSelectPnl, selectPnl }: any = useDashboard();
  const { ref, open, close }: any = useModalize();
  return (
    <Modalize
      ref={ref}
      title="Select Pnl"
      onClose={close}
      value={selectPnl}
      icon={
        <TouchableOpacity
          onPress={open}
          className={cn(
            'mx-2 flex-row items-center rounded-md  p-4',
            'border-gray-300 bg-white  dark:border-[1px]  dark:border-dashboard_card  dark:bg-dashboard_card'
          )}>
          <Text className={cn('flex-1 font-interMedium text-black dark:text-white')}>
            {getPnlValue[selectPnl]}
          </Text>
          <Ionicons name="chevron-down" size={24} className="!text-black dark:!text-white" />
        </TouchableOpacity>
      }
      onSelect={(key: any, value: any) => {
        setSelectPnl(value);
      }}
      text={getPnlValue[selectPnl]}
      data={dropdowns
        ?.filter((item: any) => item.id === '1')
        ?.map((i: any) => {
          return {
            ...i,
            selectedValue: selectPnl,
          };
        })}
      isExpanded="1"
    />
  );
};

export default SelectPnl;
