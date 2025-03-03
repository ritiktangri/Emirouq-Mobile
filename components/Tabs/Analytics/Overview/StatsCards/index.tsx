/* eslint-disable import/order */
import React, { useCallback, useMemo, useRef } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { width } from '~/constants/Colors';
import { round } from 'lodash';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import theme from '~/utils/theme';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { AverageIcon } from '~/svgs';
import { toCurrency } from '~/utils/helper.utils';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useReport } from '~/context/ReportContext';
import dayjs from 'dayjs';

const SPACING = 2;
const ITEM_LENGTH = width; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const CURRENT_ITEM_TRANSLATE_Y = 0;

const StatsCards = () => {
  const { reports }: any = useReport();

  const data = useMemo(() => {
    return [
      { id: -1 },
      {
        id: 0,
        icon: <FontAwesome name="dollar" size={24} color="skyblue" />,
        title: 'Net P&L',
        desc: 'Overall',
        value: round(reports?.totalPnl?.[0]?.totalPnl || 0, 3),
      },
      {
        id: 1,
        icon: <Feather name="trending-up" size={24} color="green" />,
        title: 'Best Month',
        desc: dayjs(reports?.bestMonth?.month).format('MMMM, YYYY'),
        value: round(reports?.bestMonth?.pnl || 0, 3),
      },
      {
        id: 2,
        icon: <Feather name="trending-down" size={24} color="red" />,
        title: 'Lowest Month',
        desc: dayjs(reports?.lowestMonth?.month).format('MMMM, YYYY'),
        value: `${round(reports?.lowestMonth?.pnl || 0, 3)}`,
      },
      {
        id: 3,
        icon: <AverageIcon className="bg-yellow-500" />,
        title: 'Average',
        desc: 'per month',
        value: `${round(reports?.averageMonth?.averagePnl || 0, 3)}`,
      },
      { id: -10 },
    ];
  }, [reports]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef<number>(1);
  const flatListRef = useRef<FlatList<any>>(null);

  const handleOnViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      const itemsInView = viewableItems.filter(({ item }: { item: any }) => item.value);

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
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item, index }) => {
          if (!item?.value) {
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
              CURRENT_ITEM_TRANSLATE_Y,
              CURRENT_ITEM_TRANSLATE_Y,
              CURRENT_ITEM_TRANSLATE_Y,
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
                className="flex h-full  bg-white p-5 dark:bg-dashboard_card">
                <View className=" flex-col gap-4">
                  <View className="flex h-16 w-16 items-center justify-center rounded-xl border-[1px] border-gray-400 dark:border-2 dark:border-gray-800">
                    <Text className="font-poppinsMedium text-lg text-dashboard_card_text">
                      {item.icon}
                    </Text>
                  </View>
                  <Text className="font-poppinsMedium text-base dark:text-dashboard_card_text">
                    {item?.title}
                  </Text>
                  <View className="flex  flex-row  gap-2">
                    <Text className="flex-1 font-poppinsSemiBold  text-3xl dark:text-white">
                      {toCurrency(item?.value)}
                    </Text>
                    <Text className="font-poppinsMedium text-base text-gray-600 dark:text-dashboard_card_text">
                      {item?.desc}
                    </Text>
                  </View>
                </View>
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
        onMomentumScrollBegin={() => {}}
      />
      <ExpandingDot
        data={data?.filter((item: any) => item.value)}
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

export default StatsCards;

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
    height: 180,
    alignItems: 'center',
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  item: {},
  itemContent: {
    marginHorizontal: SPACING * 6.5,
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
