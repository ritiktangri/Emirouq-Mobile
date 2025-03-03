/* eslint-disable import/order */
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'; // Import StyleSheet
import { useTrade } from '~/context/TradeContext';
import theme from '~/utils/theme';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';
import DefaultTextInput from '~/components/common/DefaultTextInput';

const Filters = () => {
  const { getTradesList, setFilterModal, setBulkActionModal }: any = useTrade();
  const colorScheme = useColorScheme();
  const debounceSearch = debounce(
    (e) => getTradesList(null, 15, 0, e?.nativeEvent?.text, false),
    500
  );

  return (
    <View className="flex flex-row items-center gap-2 px-2">
      <View className="flex-1">
        <DefaultTextInput
          onSubmitEditing={(e) => {
            e?.persist();
            debounceSearch(e);
          }}
          className="h-[42px] w-full rounded-lg border-gray-400 bg-white px-4 dark:border-[1px] dark:border-gray-600 dark:bg-dashboard_card dark:text-white"
          placeholder="Search symbol"
          placeholderTextColor={
            colorScheme === 'dark' ? theme.colors.dashboard_card_text : theme.colors.analytics_card
          }
        />
      </View>

      <TouchableOpacity
        onPress={() => setFilterModal(true)}
        style={[styles.button]}
        className={cn(
          'flex-row items-center gap-2 rounded-lg border-gray-400 bg-white p-4 dark:border-[1px] dark:border-gray-600 dark:bg-dashboard_card dark:text-white'
        )}>
        <Ionicons
          name="filter"
          size={20}
          color={
            colorScheme === 'dark' ? theme.colors.dashboard_card_text : theme.colors.analytics_card
          }
        />
        <Text className="font-poppinsMedium text-sm text-black dark:text-dashboard_card_text ">
          Filter
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setBulkActionModal(true)}
        style={[styles.button]}
        className={cn(
          'flex-row items-center gap-2 rounded-lg border-gray-400 bg-white p-4 dark:border-[1px] dark:border-gray-600 dark:bg-dashboard_card dark:text-white'
        )}>
        <Text className="font-poppinsMedium text-sm text-black dark:text-dashboard_card_text ">
          Bulk Actions
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={
            colorScheme === 'dark' ? theme.colors.dashboard_card_text : theme.colors.analytics_card
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 42,
  },
  textInput: {
    paddingVertical: 0,
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
  button: {
    height: 42,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
});

export default Filters;
