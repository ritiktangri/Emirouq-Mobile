/* eslint-disable object-shorthand */
/* eslint-disable import/order */
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SkiaChart } from '@wuba/react-native-echarts';
import { Dimensions, View, StyleSheet } from 'react-native'; // Import View and StyleSheet
import dayjs from 'dayjs';
import { round } from 'lodash';
import { toCurrency } from '~/utils/helper.utils';
import theme from '~/utils/theme';
import { useECharts } from '~/context/ChartContext';
import { useReport } from '~/context/ReportContext';
import NoData from '../../../common/NoData';

const { width: screenWidth } = Dimensions.get('window'); // Get screen width

export default function Chart({ chartId, data }: any) {
  const { loadingScreens }: any = useReport();
  // Prepare data for the chart
  const graphData = data?.length
    ? [
        {
          label: dayjs(data?.[0]?.date).subtract(1, 'day').format('YYYY-MM-DD'),
          pnl: 0,
          hide: true,
        },
        ...data?.map((item: any) => ({
          label: dayjs(item?.date).format('YYYY-MM-DD'),
          pnl: item?.cumulativePnl,
        })),
      ]
    : [];

  // Calculate zero offset for gradient
  const yAxisMin = useMemo(
    () => Math.min(...(graphData || [])?.map((i: any) => i?.pnl)),
    [graphData]
  );
  const yAxisMax = useMemo(
    () => Math.max(...(graphData || [])?.map((i: any) => i?.pnl)),
    [graphData]
  );
  const totalRange = yAxisMax - yAxisMin;
  const zeroOffset =
    totalRange === 0 ? 0.5 : yAxisMax <= 0 ? 0 : yAxisMin >= 0 ? 1 : yAxisMax / totalRange;

  // Dynamic Chart Dimensions
  const chartWidth = screenWidth * 0.9; // Use 90% of screen width
  const minChartHeight = 150; // Reduced minimum height
  const maxChartHeight = 230; // Maximum height
  const heightRangeMultiplier = 0.05; // Reduced multiplier
  const chartHeight = useMemo(() => {
    const dynamicHeight = minChartHeight + totalRange * heightRangeMultiplier;
    return Math.min(maxChartHeight, Math.max(minChartHeight, dynamicHeight)); // Ensure within min/max
  }, [totalRange]);

  const skiaRef = useRef(null);
  const { registerChart, unregisterChart }: any = useECharts();
  const [chartInstance, setChartInstance] = useState(null as any);

  useEffect(() => {
    const currentChart = registerChart(chartId, skiaRef.current, chartWidth, chartHeight);
    setChartInstance(currentChart);

    return () => {
      if (currentChart && (data?.length === 0 || loadingScreens === 'winLoss')) {
        unregisterChart(chartId);
      }
    };
  }, [chartId, chartWidth, chartHeight]);

  const option = useMemo(() => {
    return {
      grid: {
        containLabel: false, // You already have this, which is good
        top: 20, // Increase top spacing
        bottom: '10%', // Increase bottom spacing (especially for rotated x-axis labels)
        left: '10%', // Adjust left spacing if y-axis labels are cut off
        right: '5%',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
        },
        snap: true,
        borderRadius: 5,
        borderColor: 'rgba(50, 50, 50, 0.9)',
        formatter: (params: any) => {
          const param = params[0];
          return ` ${dayjs(param.axisValue).format('DD MMM, YYYY')}\n ${toCurrency(param.value)}`;
        },
        padding: [10, 10],
        backgroundColor: 'rgba(50, 50, 50, 0.9)',
        textStyle: {
          fontSize: 14,
          lineHeight: 14,
          color: '#fff',
        },
      },
      title: {
        left: 'center',
        text: '',
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: graphData?.map((item) => item?.label),
        axisLabel: {
          rotate: -90,
          formatter: function (value: any, index: any) {
            return dayjs(value).format('YYYY-MM-DD');
          },
          fontSize: 8,
          fontFamily: theme.font.poppinsMedium,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        show: true,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: any) {
            if (value >= 1000 || value <= -1000) {
              return `$${round(value / 1000, 2)}K`;
            } else {
              return `$${value}`;
            }
          },
          fontSize: 10,
          fontFamily: theme.font.poppinsMedium,
        },
      },
      series: [
        {
          animationDuration: 1000,
          animationEasing: 'linear',
          name: 'Cumulative P&L',
          type: 'line',
          symbol: 'none',
          data: graphData.map((item) => item.pnl),
          // smoothMonotone: 'x', // Test this
          smooth: true,

          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0, 255, 0, 0.1)',
                },
                {
                  offset: (zeroOffset - 0.01) * 0.5,
                  color: 'rgba(0, 255, 0, 0.5)',
                },
                {
                  offset: zeroOffset,
                  color: 'rgba(0, 255, 0, 0.9)',
                },
                {
                  offset: zeroOffset,
                  color: 'rgba(255, 0, 0, 0.9)',
                },
                {
                  offset: 1,
                  color: 'rgba(255, 0, 0, 0.1])',
                },
              ],
            },
          },
          lineStyle: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
            shadowOffsetY: 8,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'green',
                },
                {
                  offset: zeroOffset,
                  color: 'green',
                },
                {
                  offset: zeroOffset,
                  color: 'red',
                },
                {
                  offset: 1,
                  color: 'red',
                },
              ],
            },
          },
        },
      ],
    };
  }, [graphData, zeroOffset]);

  useEffect(() => {
    if (!chartInstance) return;

    const setOptionWhenReady = () => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.setOption(option);
      }
    };

    requestAnimationFrame(setOptionWhenReady);
  }, [chartInstance, option]);

  return (
    <View className="py-4">
      {graphData?.length ? (
        <SkiaChart ref={skiaRef} style={{ width: chartWidth, height: chartHeight }} />
      ) : (
        <NoData />
      )}
    </View>
  );
}
