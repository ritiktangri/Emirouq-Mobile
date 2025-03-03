/* eslint-disable import/order */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SkiaChart } from '@wuba/react-native-echarts';
import { View } from 'react-native';
import theme from '~/utils/theme';
import { width } from '~/constants/Colors';
import { useECharts } from '~/context/ChartContext';

import { useTags } from '~/context/TagsContext';

const colors = ['#2B7F75', '#FFD66B', '#64CCC5', '#176B87', '#DFEBEA'];

export default function Chart({ chartId, name }: any) {
  const { getChartData } = useTags();
  const data = useMemo(() => getChartData(name), [name]);
  const skiaRef = useRef(null);
  const { registerChart, unregisterChart }: any = useECharts();
  const [chartInstance, setChartInstance] = useState(null as any);

  useEffect(() => {
    const currentChart = registerChart(chartId, skiaRef.current, width * 0.6, 250);
    setChartInstance(currentChart);

    return () => {
      if (currentChart) {
        unregisterChart(chartId);
      }
    };
  }, [chartId]);

  const title = useMemo(() => {
    return {
      text: '',
      subtext: '',
      left: 'center',
    };
  }, []);
  const tooltip = useMemo(() => {
    return {
      trigger: 'item',
    };
  }, []);
  const legend = useMemo(() => {
    return {
      top: '5%',
      orient: 'vertical',
      left: 'left',
      show: false,
    };
  }, []);
  const series = useMemo(() => {
    return [
      {
        type: 'pie',
        animationDuration: 1000,
        animation: false,
        animationEasing: 'quinticIn', // Easing for initial data
        color: data?.map((item: any, index: any) => colors[index % colors?.length]), // Assign colors dynamically
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        label: {
          show: false,
        },
        center: ['50%', '50%'],

        tooltip: {
          show: true,
          confine: true,
          renderMode: 'html', // Switch to HTML mode
          borderRadius: 5,
          borderColor: 'rgba(50, 50, 50, 0.9)', // works
          fontFamily: theme.font.poppinsMedium,
          formatter: (params: any) => {
            return `${params?.name}\nTrades:${params?.value} \nPercent:${params?.percent}%`;
          },
          backgroundColor: 'rgba(50, 50, 50, 0.9)', // Example background color
          textStyle: {
            fontFamily: theme.font.poppinsMedium,
            fontSize: 12,
            color: '#fff',
            lineHeight: 14, // Match line height to font size
            margin: 0, // Reset margin
            padding: 0, // Reset padding within textStyle
          },
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
  }, [data, colors]);
  const option = useMemo(() => {
    return {
      title,
      tooltip,
      legend,
      series,
    };
  }, [title, tooltip, legend, series]);
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
    <View className="flex  self-center ">
      <SkiaChart ref={skiaRef} />
    </View>
  );
}
