/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { useModalize } from 'react-native-modalize';
import Modalize from '~/components/Modalize';
import { useQuery } from '~/context/QueryContext';

import { dropdowns } from '~/utils/dropdown';
import { cn } from '~/utils/helper.utils';

type FilterProps = {
  status: string;
  tradeType: string;
  result: string;
  [key: string]: string;
};
const Filter = () => {
  const { ref, open, close }: any = useModalize(); // Specify Modalize type here
  const { globalQueries, setQuery }: any = useQuery();
  const [localFilter, setLocalFilter] = useState({
    status: '',
    tradeType: '',
    result: '',
  } as FilterProps);
  useEffect(() => {
    setLocalFilter(globalQueries);
  }, [globalQueries]);
  return (
    <View className="">
      <Modalize
        title="Filter"
        ref={ref}
        onClose={close}
        icon={
          <TouchableOpacity className="rounded-md" onPress={open}>
            <Ionicons name="filter-outline" size={20} className="!text-black dark:!text-white" />
          </TouchableOpacity>
        }
        footer={
          <View className="flex w-full flex-row justify-center gap-x-4 p-5">
            <TouchableOpacity
              onPress={() => {
                setLocalFilter({
                  status: '',
                  tradeType: '',
                  result: '',
                });
              }}
              className={cn(
                'flex-1 rounded-md   bg-[#E3EAF31F] py-3',
                'border border-gray-400 dark:border-0'
              )}>
              <Text className={cn('text-center font-poppinsMedium dark:text-white ')}>
                Clear Filter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const isFIltersUpdates = Object.keys(localFilter).some(
                  (key) => localFilter[key] !== globalQueries[key]
                );
                if (!isFIltersUpdates) return close();
                setQuery(localFilter);
                close();
              }}
              className="flex-1 rounded-md bg-primary py-3">
              <Text className="text-center font-poppinsMedium text-white">Apply Filter</Text>
            </TouchableOpacity>
          </View>
        }
        onSelect={(key: any, value: any) => {
          setLocalFilter((prev: any) => ({ ...prev, [key]: value }));
        }}
        text=""
        data={dropdowns
          ?.filter((item: any) => ['status', 'tradeType', 'result']?.includes(item?.key))
          ?.map((i: any) => {
            return {
              ...i,
              selectedValue: localFilter?.[i?.key] || '',
            };
          })}
      />
    </View>
  );
};

export default Filter;
