/* eslint-disable import/order */
import dayjs from 'dayjs';
import React from 'react';
import { View, Text } from 'react-native';

import { useAuth } from '~/context/AuthContext';
import { TradeLogoSVG } from '~/svgs';
import { cn, getInitials } from '~/utils/helper.utils';
import HtmlView from './render-html';
import ImagePopup from '~/components/common/ImagePopup';

const Timeline = ({ item }: any) => {
  const { user } = useAuth();
  return (
    <View className=" flex-1 flex-row  gap-4 p-4">
      <View
        className={cn(
          'flex items-center justify-center',
          user?.uuid !== item?.user ? 'bg-blue-500' : 'bg-analytics_card',
          'h-12 w-12 rounded-full'
        )}>
        {user?.uuid === item?.user ? (
          <Text className="text-lg font-bold text-white">
            {getInitials(`${user?.firstName} ${user?.lastName}`)}
          </Text>
        ) : (
          <TradeLogoSVG />
        )}
      </View>

      <View className="flex flex-1 flex-col gap-2">
        <View className="flex flex-1  flex-row gap-3">
          <Text className=" flex-1 font-poppinsMedium text-white">
            {item?.user === user?.uuid ? `${user?.firstName} ${user?.lastName}` : 'Tradelizer'}
          </Text>
          <Text className=" font-poppinsMedium text-xs text-dashboard_card_text">
            {dayjs(item?.createdAt).format('MMM DD, YYYY, HH:mm A')}
          </Text>
        </View>
        <View className="flex-1 rounded-b-xl rounded-r-xl  border-[1px] border-gray-700 p-4">
          {/* <Text className="font-poppinsMedium text-sm text-white">{item?.message}</Text> */}
          <HtmlView source={item?.message} />
        </View>
        {item?.attachments?.length > 0 ? (
          item?.attachments?.map((i: any) => {
            return <ImagePopup item={i} key={i?.url} imageUrl={i?.url} />;
          })
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Timeline;
