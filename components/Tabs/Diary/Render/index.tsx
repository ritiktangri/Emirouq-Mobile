/* eslint-disable import/order */
import { View, Text } from 'react-native';
import React, { useCallback, useState, memo, useEffect } from 'react';
import dayjs from 'dayjs';
import {
  MemoizedCumulativePnl,
  MemoizedStats,
  MemoizedTradeHistory,
  MemoizedUploadAttachments,
} from '../export';
import theme from '~/utils/theme';
import Tabs from '../../Portfolio/Trades/tabs';
import DefaultTextInput from '~/components/common/DefaultTextInput';

const Render = ({ item }: any) => {
  // Add saveJournalEntry prop
  const [activeTab, setActiveTab] = useState('stats');
  const handleTabChange = useCallback((tabKey: any) => {
    setActiveTab(tabKey);
  }, []);

  const [notes, setNotes] = useState({
    notes: '',
    date: '',
    journalId: '',
    attachments: [],
    removedAttachments: [],
  } as any);
  useEffect(() => {
    if (item?.dailyJournal?.uuid) {
      setNotes({
        notes: item?.dailyJournal?.notes || '',
        date: item?.date,
        journalId: item?.dailyJournal?.uuid,
        attachments: item?.dailyJournal?.attachments || [],
        removedAttachments: item?.dailyJournal?.removedAttachments || [],
      });
    }
  }, [item]);

  return (
    <View className="flex-1 gap-y-4 rounded-lg bg-white p-3 dark:bg-diary_bg">
      <View className="flex flex-row">
        <View className="rounded-lg bg-diary_date_bg px-4 py-2">
          <Text className="font-poppinsMedium dark:text-white">
            {dayjs(item?.date).format('ddd, MMM DD, YYYY')}
          </Text>
        </View>
      </View>
      <View className="h-[200px] w-full justify-center">
        <DefaultTextInput
          value={notes.notes}
          onChangeText={(text: any) => setNotes({ ...notes, notes: text })}
          className="h-[200px]  max-h-[200px] w-full rounded-lg border-[1px] border-gray-400 p-3 dark:border-2 dark:border-gray-600 dark:text-white"
          multiline
          numberOfLines={10}
          placeholder="Write your thoughts here..."
          textAlignVertical="top"
          placeholderClassName="!text-white"
          placeholderTextColor={theme.colors.dashboard_card_text}
        />
      </View>
      <MemoizedUploadAttachments data={notes} setData={setNotes} />
      <MemoizedCumulativePnl data={item} />

      {/* <TouchableOpacity className=" flex items-center justify-center">
        <Ionicons name="chevron-down" size={24} color={theme.colors.dashboard_card_text} />
      </TouchableOpacity> */}
      <Tabs
        state={activeTab}
        setState={handleTabChange}
        list={[
          { id: 1, title: 'Stats', key: 'stats' },
          { id: 2, title: 'Trade History', key: 'tradeHistory' },
        ]}
      />
      {activeTab === 'stats' && <MemoizedStats item={item} />}
      {activeTab === 'tradeHistory' && <MemoizedTradeHistory item={item} />}
    </View>
  );
};

export default memo(Render);
