/* eslint-disable import/order */
import { View, FlatList, RefreshControl } from 'react-native';
import React, { useMemo, useState } from 'react';
import { DefaultText as Text } from '~/components/common/DefaultText';
import CustomHeader from '~/components/UI/CustomHeader';
import theme from '~/utils/theme';
import { useSupport } from '~/context/SupportContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tabs from '~/components/Tabs/Portfolio/Trades/tabs';
import FAQS from './Faqs';
import ContactUs from './ContactUs';

const SupportInbox = () => {
  const { getSupportList }: any = useSupport();
  const [activeTab, setActiveTab] = useState('faqs');
  const components = useMemo(() => {
    return [activeTab === 'faqs' ? <FAQS /> : <ContactUs />];
  }, [activeTab]);
  const renderHeader = useMemo(() => {
    return (
      <View className="flex-1 gap-y-4 ">
        <CustomHeader />
        <Text className="font-poppinsSemiBold text-2xl dark:text-white">Help & Support</Text>

        <Tabs
          state={activeTab}
          setState={setActiveTab}
          textClassName="text-base"
          list={[
            { id: 1, title: 'FAQ`s', key: 'faqs' },
            { id: 2, title: 'Contact Us', key: 'contactus' },
          ]}
        />
      </View>
    );
  }, [activeTab]);
  return (
    <SafeAreaView className="flex-1 bg-white  dark:bg-black">
      <FlatList
        data={components}
        refreshControl={
          <RefreshControl
            colors={[theme.colors.primary]}
            refreshing={false}
            onRefresh={getSupportList}
            tintColor={theme.colors.primary}
          />
        }
        ListHeaderComponentClassName="mb-5 px-4 bg-white dark:bg-black"
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        className="bg-white dark:bg-black"
        contentContainerClassName=""
        renderItem={({ item }) => {
          return item;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default SupportInbox;
