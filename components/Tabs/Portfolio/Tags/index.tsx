/* eslint-disable import/order */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { width } from '~/constants/Colors';
import Chart from './chart';
import { AntDesign } from '@expo/vector-icons';
import TagsList from './tag-list';
import { useECharts } from '~/context/ChartContext';
import { useTags } from '~/context/TagsContext';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import theme from '~/utils/theme';
import { DefaultText as Text } from '~/components/common/DefaultText';

import { SelectPnl as SelectTags } from '~/components/common/SelectPnl';
import { setStorageItemAsync } from '~/hooks/useStorageState';
import { cn } from '~/utils/helper.utils';

const SPACING = 2;
const ITEM_LENGTH = width; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const CURRENT_ITEM_TRANSLATE_Y = 0;

const Tags = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef<number>(1);
  const flatListRef = useRef<FlatList<any>>(null);
  const { hideTooltip }: any = useECharts();
  const { getCategoryColor, selectedTagsArray, tagList, setSelectCategory, selectCategory } =
    useTags();
  const data: any[] = useMemo(() => {
    return [
      { id: -1 },
      {
        id: 0,
        title: (
          <View className="flex flex-row items-center gap-2 p-5">
            <AntDesign name="tagso" size={24} color={getCategoryColor('Mistakes')} />

            <Text className={cn('font-poppinsMedium text-xl', 'dark:text-dashboard_card_text')}>
              Mistakes
            </Text>
          </View>
        ),
        name: 'Mistakes',
        color: getCategoryColor('Mistakes'),
      },
      {
        id: 1,
        title: (
          <View className="flex flex-row items-center gap-2 p-5">
            <AntDesign name="tagso" size={24} color={getCategoryColor('Setups')} />

            <Text className={cn('font-poppinsMedium text-xl', 'dark:text-dashboard_card_text')}>
              Setups
            </Text>
          </View>
        ),
        name: 'Setups',
        color: getCategoryColor('Setups'),
      },
      {
        id: 2,
        title: (
          <View className="flex flex-row items-center gap-0 p-5">
            <AntDesign
              name="tagso"
              size={24}
              color={selectCategory ? getCategoryColor(selectCategory) : '#fff'}
            />
            <SelectTags
              containerClassName="mx-4"
              // nestedDropdownClassName="px-4"
              options={{
                data: tagList
                  ?.filter((i: any) => !['Mistakes', 'Setups'].includes(i?.name))
                  ?.map((i: any) => {
                    return {
                      id: i?.name,
                      label: i?.name,
                      value: i?.name,
                      icon: <AntDesign name="tagso" size={24} color={getCategoryColor(i?.name)} />,
                    };
                  }),
              }}
              selected={selectCategory}
              value={selectCategory || 'Select Tags'}
              setSelected={async (value: any) => {
                setSelectCategory(value);
                await setStorageItemAsync('selectedTag', value);
              }}
              overlay={false}
            />
          </View>
        ),
        name: selectCategory || 'Add Category',
        color: selectCategory ? getCategoryColor(selectCategory) : '#fff',
      },
      { id: -10 },
    ];
  }, [getCategoryColor, selectedTagsArray, tagList, setSelectCategory, selectCategory]);
  const handleOnViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      const itemsInView = viewableItems.filter(({ item }: { item: any }) => item.title);

      if (itemsInView.length === 0) {
        return;
      }

      currentIndex.current = itemsInView[0].index;
    },
    [data]
  );

  // `data` perameter is not used. Therefore, it is annotated with the `any` type to merely satisfy the linter.
  const getItemLayout = (_data: any, index: number) => ({
    length: ITEM_LENGTH,
    offset: ITEM_LENGTH * (index - 1),
    index,
  });

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => {
          if (!item.title) {
            return <View style={{ width: EMPTY_ITEM_LENGTH }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_LENGTH,
            (index - 1) * ITEM_LENGTH,
            index * ITEM_LENGTH,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [
              CURRENT_ITEM_TRANSLATE_Y + 30,
              CURRENT_ITEM_TRANSLATE_Y,
              CURRENT_ITEM_TRANSLATE_Y + 30,
            ],
            extrapolate: 'clamp',
          });

          return (
            <View style={{ width: ITEM_LENGTH }}>
              <Animated.View
                style={[
                  {
                    transform: [{ translateY }],
                  },
                  styles.itemContent,
                ]}
                className={cn(
                  'mx-2 h-full flex-col gap-0 rounded-lg bg-white dark:bg-dashboard_card'
                )}>
                {item.title}
                <Chart name={item.name} chartId={`tags-chart-${index}`} />
                <TagsList name={item.name} />
              </Animated.View>
            </View>
          );
        }}
        getItemLayout={getItemLayout}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={ITEM_LENGTH}
        snapToAlignment="start"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        onMomentumScrollBegin={() => {
          //hide tooltip on scroll
          hideTooltip();
        }}
      />
      <ExpandingDot
        data={data?.filter((item: any) => item?.title)}
        expandingDotWidth={30}
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 5,
        }}
        activeDotColor={theme.colors.dashboard_card_text}
        containerStyle={{
          bottom: 10,
        }}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  container: {},
  arrowBtn: {},
  arrowBtnText: {
    fontSize: 42,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  flatListContent: {
    alignItems: 'center',
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  item: {},
  itemContent: {
    // height: 280,
    marginHorizontal: SPACING * 3,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 24,
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: 'white',
    fontWeight: '600',
  },
});
