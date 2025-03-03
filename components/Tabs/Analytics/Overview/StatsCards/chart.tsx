/* eslint-disable import/order */
import React, { useRef, useEffect, useState } from 'react';
import { SkiaChart } from '@wuba/react-native-echarts';
import { View } from 'react-native';
import theme from '~/utils/theme';
import { useECharts } from '~/context/ChartContext';
import { toCurrency } from '~/utils/helper.utils';

const colors: any = {
  'Total Profit': '#008001',
  'Total Loss': '#FF0000',
  'Avg Win': '#008001',
  'Avg Loss': '#FF0000',
  'Winning Days': '#008001',
  'Losing Days': '#FF0000',
  'Break Even Days': '#FFA500',
};

export default function Chart({ chartId, data, index }: any) {
  const skiaRef = useRef(null);
  const { registerChart, unregisterChart }: any = useECharts();
  const [chartInstance, setChartInstance] = useState(null as any);

  useEffect(() => {
    const currentChart = registerChart(chartId, skiaRef.current, 170, 170);
    setChartInstance(currentChart);

    return () => {
      if (currentChart) {
        unregisterChart(chartId);
      }
    };
  }, [chartId]);

  useEffect(() => {
    if (!!data === false) return;
    if (!chartInstance) return;
    const option = {
      title: {
        text: '',
        subtext: '',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        orient: 'vertical',
        left: 'left',
        show: false,
      },
      series: [
        {
          animation: true,
          animationDuration: 1000,
          animationEasing: 'linear', // Easing for initial data
          type: 'pie',
          color: data.map((item: any) => colors[item.name]), // Assign colors dynamically
          // clockwise: true,
          // selectedMode: 'single',
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
            // trigger: 'axis',
            renderMode: 'richText', // but 'html' works fine
            borderRadius: 5, // works
            borderColor: 'rgba(50, 50, 50, 0.9)', // works
            fontFamily: theme.font.poppinsMedium,
            formatter: (params: any) => {
              return `${params?.name}: ${index !== 3 ? toCurrency(params?.data?.value) : params?.data?.value}`; // Example: "Category A: 123"
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
      ],
    };

    const setOptionWhenReady = () => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.setOption(option);
      }
    };

    // Use requestAnimationFrame for a more reliable delay
    requestAnimationFrame(setOptionWhenReady);
  }, [chartInstance, data, index]);

  return (
    <View className="flex-row  items-center ">
      <SkiaChart ref={skiaRef} />
    </View>
  );
}
