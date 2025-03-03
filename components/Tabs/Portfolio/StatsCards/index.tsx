/* eslint-disable import/order */
import React, { useCallback, useMemo, useRef } from 'react';
import { Animated, FlatList, StyleSheet, View } from 'react-native';
import { width } from '~/constants/Colors';
import Chart from './chart';
import { useDashboard } from '~/context/DashboardContext';
import { round } from 'lodash';
import { useECharts } from '~/context/ChartContext';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import theme from '~/utils/theme';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { cn } from '~/utils/helper.utils';

const SPACING = 2;
const ITEM_LENGTH = width; // Item is a square. Therefore, its height and width are of the same length.
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;
const CURRENT_ITEM_TRANSLATE_Y = 0;

const StatsCards = () => {
  let { data } = useDashboard();
  const { hideTooltip }: any = useECharts();
  data = useMemo(() => {
    return [
      { id: -1 },
      {
        id: 0,
        title: 'Profit to Loss Ratio',
        value: round(data?.pnlStats?.profitFactor || 0, 2),
        data: [
          { value: round(data?.pnlStats?.totalProfit || 0, 2), name: 'Total Profit' },
          { value: round(data?.pnlStats?.totalLoss || 0, 2), name: 'Total Loss' },
        ],
      },
      {
        id: 1,
        title: 'Avg Win/Loss',
        value: round(data?.pnlStats?.avgWinFactor || 0, 2),
        data: [
          { value: round(data?.pnlStats?.avgWin || 0, 2), name: 'Avg Win' },
          { value: round(data?.pnlStats?.avgLoss || 0, 2), name: 'Avg Loss' },
        ],
      },
      {
        id: 2,
        title: 'Day win %',
        value: `${round(data?.dailyStats?.winPercent || 0, 2)}%`,
        data: [
          { value: round(data?.dailyStats?.winDays || 0, 2), name: 'Winning Days' },
          { value: round(data?.dailyStats?.lossDays || 0, 2), name: 'Losing Days' },
          { value: round(data?.dailyStats?.breakEvenDays || 0, 2), name: 'Break Even Days' },
        ],
      },
      { id: -10 },
    ];
  }, [data]);
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
                className={cn('flex h-full flex-row  bg-white p-5  dark:bg-dashboard_card')}>
                <View className="flex-1 flex-col gap-2">
                  <Text className={cn('font-poppinsMedium text-lg dark:text-dashboard_card_text ')}>
                    {item.title}
                  </Text>
                  <Text className={cn('font-poppinsSemiBold text-3xl text-black dark:text-white')}>
                    {item?.value}
                  </Text>
                </View>
                <Chart chartId={`stats-card-${index}`} index={index} data={item.data} />
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
          bottom: 4,
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
    height: 150,
    alignItems: 'center',
    marginBottom: CURRENT_ITEM_TRANSLATE_Y,
  },
  item: {},
  itemContent: {
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
