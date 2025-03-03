/* eslint-disable import/order */
import { View, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { DeleteSVG } from '~/svgs/drawer';
import { FontAwesome6 } from '@expo/vector-icons';
import theme from '~/utils/theme';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useTheme } from '~/context/ThemeContext';

const Description = ({ tag, onEdit }: any) => {
  const { isDarkTheme } = useTheme();
  return (
    <View
      key={tag.uuid}
      className="flex-1 flex-row  gap-2 rounded-lg   bg-gray-100 px-4 py-6 dark:bg-dashboard_card ">
      <View className="flex-1 gap-y-2">
        <Text className="font-poppinsMedium text-base text-black dark:text-white">{tag?.name}</Text>
        <Text className="font-poppinsMedium text-xs text-gray-800 dark:text-gray-500 ">
          {tag?.description}
        </Text>
      </View>

      <View className="  flex-row   gap-x-2 ">
        <TouchableOpacity
          style={{ opacity: !['Setups', 'Mistakes']?.includes(tag?.name) ? 1 : 0 }}
          onPress={() =>
            onEdit({ ...tag, section: 'edit-tag', categoryId: tag?.categoryId, type: 'tags' })
          }>
          <FontAwesome6
            name="edit"
            size={15}
            color={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ opacity: !['Setups', 'Mistakes']?.includes(tag?.name) ? 1 : 0 }}
          onPress={() =>
            onEdit({ ...tag, type: 'delete', platform: Platform.OS, section: 'delete-tag' })
          }>
          <DeleteSVG
            width={17}
            height={17}
            fill={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Description;
