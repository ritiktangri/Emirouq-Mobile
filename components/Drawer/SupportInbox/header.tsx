/* eslint-disable import/order */
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import theme from '~/utils/theme';
import { useSupport } from '~/context/SupportContext';
import { useModalize } from 'react-native-modalize';
import Modalize from '~/components/Modalize';
import { dropdowns } from '~/utils/dropdown';

const Header = () => {
  const colorScheme = useColorScheme();
  const { setStatus, status, setType, type, getSupportList, setCurrentPage }: any = useSupport();
  const { ref, open, close }: any = useModalize(); // Specify Modalize type here
  return (
    <View className="flex-row items-center gap-4 ">
      <View className="flex-1 flex-row items-center justify-around rounded-xl border border-analytics_card  dark:border-dashboard_card_text">
        <TouchableOpacity
          onPress={() => {
            setStatus('open');
            setCurrentPage(0);
            getSupportList(null, 10, 0, '', 'open', type, false);
          }}
          className={`flex-1 rounded-l-xl py-4 ${status === 'open' ? ' bg-[#F1F1F1] dark:bg-dashboard_card' : 'bg-black'} `}>
          <Text
            className={`text-center font-semibold ${status === 'open' ? 'text-black dark:text-[#CECFD2]' : 'text-[#85888E]'}`}>
            Open
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStatus('closed');
            setCurrentPage(0);
            getSupportList(null, 10, 0, '', 'closed', type, false);
          }}
          className={`flex-1  rounded-r-xl py-4 ${status === 'closed' ? 'bg-[#F1F1F1] dark:bg-dashboard_card' : 'bg-black'}`}>
          <Text
            className={`text-center font-semibold ${status === 'closed' ? 'text-black dark:text-[#CECFD2]' : 'text-[#85888E]'}`}>
            Closed
          </Text>
        </TouchableOpacity>
      </View>

      <Modalize
        ref={ref}
        title="Filter By"
        onClose={close}
        value={type}
        icon={
          <TouchableOpacity
            onPress={open}
            className={`flex-row items-center gap-1 rounded-lg bg-white p-4  dark:bg-dashboard_card ${colorScheme === 'dark' ? 'border border-dashboard_card_text' : ''}`}>
            <Ionicons name="filter" size={13} color={theme.colors.dashboard_card_text} />
            <Text className="font-poppinsMedium text-sm text-dashboard_card_text ">
              Filter By <Text className="capitalize">{type}</Text>
            </Text>
          </TouchableOpacity>
        }
        onSelect={(key: any, value: any) => {
          setType(value);
          setCurrentPage(0);
          getSupportList(null, 10, 0, '', status, value, false);
        }}
        text={type}
        data={dropdowns
          ?.filter((item: any) => item.id === '5')
          ?.map((i: any) => {
            return {
              ...i,
              selectedValue: type,
            };
          })}
        isExpanded="5"
      />
    </View>
  );
};

export default Header;
