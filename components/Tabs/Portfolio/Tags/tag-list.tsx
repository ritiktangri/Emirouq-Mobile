import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { useTags } from '~/context/TagsContext';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/utils/helper.utils';

const colors = ['#2B7F75', '#FFD66B', '#64CCC5', '#176B87', '#DFEBEA'];

const TagsList = ({ name }: any) => {
  const { getChartData } = useTags();
  const data = useMemo(() => getChartData(name), [name]);
  return (
    <FlatList
      data={data}
      className="mx-4"
      contentContainerClassName="gap-3 mb-10"
      keyExtractor={(item: any) => item.name}
      numColumns={2}
      renderItem={({ item, index }) => {
        return (
          <View className=" w-1/2 flex-row  gap-2 px-2">
            <View
              className="h-5 w-2 self-center rounded-sm"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <View>
              <Text
                className={cn(
                  'font-poppinsMedium text-sm text-tertiary dark:text-dashboard_card_text'
                )}>
                {item.name}
              </Text>
              <Text className={cn('font-poppinsSemiBold text-base dark:text-white')}>
                {item.percent}%
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default TagsList;
