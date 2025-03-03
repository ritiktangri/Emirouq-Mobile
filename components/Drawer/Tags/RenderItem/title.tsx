/* eslint-disable import/order */
import { Platform, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import { DeleteSVG, TagsAddSVG } from '~/svgs/drawer';
import theme from '~/utils/theme';
import { useTheme } from '~/context/ThemeContext';

const Title = ({ item, onEdit }: any) => {
  const { isDarkTheme } = useTheme();
  return (
    <View className="flex-1 flex-row items-center gap-4 ">
      <View className="flex-1 ">
        <Text className=" font-poppinsMedium text-black dark:text-white">{item?.name}</Text>
      </View>

      <View className="  flex-row items-center justify-end gap-x-6 ">
        <AntDesign name="tagso" size={25} color={item?.color} />

        <TouchableOpacity
          onPress={() =>
            onEdit({ ...item, type: 'tags', section: 'add-tag', categoryId: item?.uuid, name: '' })
          }>
          <TagsAddSVG
            stroke={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ opacity: !['Setups', 'Mistakes']?.includes(item?.name) ? 1 : 0 }}
          onPress={() => onEdit({ ...item, type: 'category', section: 'edit-category' })}>
          <FontAwesome6
            name="edit"
            size={18}
            color={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ opacity: !['Setups', 'Mistakes']?.includes(item?.name) ? 1 : 0 }}
          onPress={() =>
            onEdit({ ...item, type: 'delete', platform: Platform.OS, section: 'delete-category' })
          }>
          <DeleteSVG
            fill={isDarkTheme ? theme.colors.dashboard_card_text : theme.colors.analytics_card}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Title;
