/* eslint-disable import/order */
import React, { useState } from 'react';
import DefaultTextInput from '~/components/common/DefaultTextInput';
import { Ionicons, Octicons } from '@expo/vector-icons';
import theme from '~/utils/theme';
import { i18n } from '~/utils/i18n';
import { View } from '~/components/common/View';
import { useLocale } from '~/context/LocaleContext';
import { FlatList, Modal, Platform, Text, TouchableOpacity } from 'react-native';
import { cn } from '~/utils/helper';
import {
  MemoizedCategorySelector,
  MemoizedDateSorting,
  MemoizedLocationInput,
  MemoizedPriceRangeSelector,
  MemoizedSorting,
} from './FilterComponents/export';

const Search = () => {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <View direction={locale} className="flex w-full items-center justify-between">
      <DefaultTextInput
        prefix={<Ionicons name="search" size={20} color="#000" />}
        placeholder={i18n.t('home.searchPlaceHolder')}
        containerClassName={`bg-search_bg rounded-lg ${Platform.OS === 'ios' ? 'p-3' : 'px-2'}`}
        textAlign={locale === 'ar' ? 'right' : 'left'}
        placeholderTextColor={theme.colors.gray}
        className="w-[80%] px-4 text-lg"
      />
      <TouchableOpacity
        className="relative"
        onPress={() => {
          setOpen(!open);
        }}>
        <Octicons name="filter" size={24} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={open}
        transparent
        onDismiss={() => setOpen(open)}
        onRequestClose={() => setOpen(open)}>
        <View className="flex-1 justify-end bg-[rgba(0,0,0,0.5)]">
          <View className="h-[80%] rounded-tl-xl rounded-tr-xl  bg-white pl-3 dark:bg-dashboard_card">
            <FlatList
              onEndReachedThreshold={0.3}
              showsVerticalScrollIndicator={false}
              ListHeaderComponentClassName=""
              stickyHeaderIndices={[0]}
              ListHeaderComponent={() => (
                <View
                  className={cn(
                    'flex-row items-center justify-between  px-5 py-2',
                    'dark:bg-dashboard_card'
                  )}>
                  <Text className={cn('text-xl font-semibold', '')}>{i18n.t('home.filters')}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setOpen(false);
                    }}
                    className="p-2">
                    <Ionicons
                      name="close"
                      size={24}
                      className={cn('!text-black dark:!text-white')}
                    />
                  </TouchableOpacity>
                </View>
              )}
              data={[
                <MemoizedPriceRangeSelector />,
                <MemoizedCategorySelector />,
                <MemoizedLocationInput />,
                <MemoizedSorting />,
                <MemoizedDateSorting />,
              ]}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }: any) => {
                return item;
              }}
              initialNumToRender={6}
            />
            <View className="mb-10 flex w-full flex-row justify-center gap-x-4 p-5">
              <TouchableOpacity
                onPress={() => {}}
                className={cn(
                  'flex-1 rounded-md   bg-[#E3EAF31F] py-3',
                  'border border-gray-400 dark:border-0'
                )}>
                <Text className={cn('text-center font-poppinsMedium dark:text-white ')}>
                  {i18n.t('home.reset')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOpen(false);
                }}
                className="flex-1 rounded-md bg-primary py-3">
                <Text className="text-center font-poppinsMedium text-white">
                  {i18n.t('home.apply_filters')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Search;
