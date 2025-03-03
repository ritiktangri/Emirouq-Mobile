/* eslint-disable import/order */
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import { getTagsByTitle } from '~/utils/get-tags-by-title';
import CustomHeader from '~/components/UI/CustomHeader';
import { useSupport } from '~/context/SupportContext';

const Header = ({ id }: any) => {
  const { closeOpenSupport, activityList }: any = useSupport();
  const [loading, setLoading] = useState(false);
  return (
    <View className="">
      <CustomHeader />
      <View className="gap-y-3 bg-dashboard_card p-4">
        <View className="flex flex-row items-center gap-2">
          <Text className="flex-1 font-poppinsMedium text-lg font-bold dark:text-white">
            {dayjs(activityList?.createdAt).format('DD MMM, YYYY')}
          </Text>
          <Text className="font-poppinsMedium  font-bold dark:text-white">
            {getTagsByTitle(activityList?.type, 'text-lg px-5 py-2 rounded-full')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setLoading(true);
              closeOpenSupport(
                {
                  supportId: id,
                  status: activityList?.status === 'open' ? 'closed' : 'open',
                },
                () => {
                  setLoading(false);
                },
                () => {
                  setLoading(false);
                }
              );
            }}
            className="flex flex-row items-center gap-2 rounded-lg bg-primary px-5 py-2 ">
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Ionicons name="ticket-outline" size={20} color="white" />
            )}
            <Text className="font-poppinsMedium  text-base text-white">
              {activityList?.status === 'open' ? 'Close' : 'Open'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="py-3  font-poppinsMedium text-xl dark:text-white">
          {activityList?.subject}
        </Text>
      </View>
    </View>
  );
};

export default Header;
