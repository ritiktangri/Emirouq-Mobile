/* eslint-disable import/order */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SkiaChart } from '@wuba/react-native-echarts';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';

import theme from '~/utils/theme';
import dayjs from 'dayjs';
import { cn, toCurrency } from '~/utils/helper.utils';
import { useECharts } from '~/context/ChartContext';
import { useDashboard } from '~/context/DashboardContext';

const colors: any = {
  'Winning Trades': '#008001',
  'Losing Trades': '#FF0000',
  'Break Even Trades': '#FFFF00',
};

export default function Chart({ chartId }: any) {
  let { data } = useDashboard();
  data = useMemo(() => {
    return [
      { value: data?.pnlStats?.tradesWinCount, name: 'Winning Trades' },
      { value: data?.pnlStats?.tradesLossCount, name: 'Losing Trades' },
      { value: data?.pnlStats?.tradeBreakEvenCount, name: 'Break Even Trades' },
    ];
  }, [data]);
  const skiaRef = useRef(null);
  const { registerChart, unregisterChart }: any = useECharts();
  const [chartInstance, setChartInstance] = useState(null as any);

  useEffect(() => {
    const currentChart = registerChart(chartId, skiaRef.current, 220, 180);
    setChartInstance(currentChart);

    return () => {
      if (currentChart) {
        unregisterChart(chartId);
      }
    };
  }, [chartId]);
  const tooltip = useMemo(() => {
    return {
      show: true,
      confine: true,
      // trigger: 'axis',
      renderMode: 'richText', // but 'html' works fine
      borderRadius: 5, // works
      borderColor: 'rgba(50, 50, 50, 0.9)', // works
      fontFamily: theme.font.poppinsMedium,
      formatter: ['{b}: {c}'].join('\n'),
      backgroundColor: 'rgba(50, 50, 50, 0.9)', // Example background color
      textStyle: {
        fontFamily: theme.font.poppinsMedium,
        fontSize: 12,
        color: '#fff',
        lineHeight: 14, // Match line height to font size
        margin: 0, // Reset margin
        padding: 0, // Reset padding within textStyle
      },
    };
  }, []);
  const series = useMemo(() => {
    return [
      {
        animation: true,
        animationDuration: 1000,
        animationEasing: 'linear', // Easing for initial data
        type: 'pie',
        color: data?.map((item: any) => colors[item?.name]), // Assign colors dynamically
        // clockwise: true,
        // selectedMode: 'single',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        label: {
          show: false,
        },
        center: ['50%', '50%'],

        borderRadius: 5,
        borderColor: 'rgba(50, 50, 50, 0.9)', // works
        formatter: (params: any) => {
          const param = params[0];
          return ` ${dayjs(param.axisValue).format('DD MMM, YYYY')}\n ${toCurrency(param.value)}`;
        },
        padding: [10, 10], // Ensure no padding
        backgroundColor: 'rgba(50, 50, 50, 0.9)', // Example background color
        textStyle: {
          fontSize: 14,
          lineHeight: 14, // Match line height to font size
          margin: 0, // Reset margin
          padding: 0, // Reset padding within textStyle
          color: '#fff', // Example text color
        },
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            show: false,
          },
        },
        itemStyle: {
          borderRadius: 10,
        },
      },
    ];
  }, [data]);

  const option = useMemo(() => {
    return {
      tooltip,
      series,
    };
  }, [series, colors]);
  useEffect(() => {
    if (!chartInstance) return;

    const setOptionWhenReady = () => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.setOption(option);
      }
    };

    // Use requestAnimationFrame for a more reliable delay
    requestAnimationFrame(setOptionWhenReady);
  }, [chartInstance, option]);

  return (
    <View className={cn('flex-row items-center gap-2 bg-white md:gap-8 dark:bg-dashboard_card')}>
      <SkiaChart ref={skiaRef} />
      <View className="flex-col gap-5">
        {data?.map((i: any) => (
          <View className="flex-row items-center gap-5" key={i.name}>
            <View className="h-2 w-2 rounded-sm" style={{ backgroundColor: colors[i.name] }} />
            <View className="flex-col gap-1">
              <Text className={cn('font-poppinsMedium text-xs dark:text-dashboard_card_text')}>
                {i.name}
              </Text>
              <Text className={cn('font-poppinsMedium text-base dark:text-dashboard_card_text')}>
                {i.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
