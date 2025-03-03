/* eslint-disable object-shorthand */
/* eslint-disable import/order */
import React, { useRef, useEffect, useState, useMemo } from 'react';

import { SkiaChart } from '@wuba/react-native-echarts';
import { width } from '~/constants/Colors';
import dayjs from 'dayjs';
import { round } from 'lodash';
import { toCurrency } from '~/utils/helper.utils';
import theme from '~/utils/theme';
import { useECharts } from '~/context/ChartContext';
import { useDashboard } from '~/context/DashboardContext';

export default function Chart({ chartId }: any) {
  const { data } = useDashboard();
  // Prepare data for the chart
  const graphData = data?.cumulative?.length
    ? [
        {
          label: dayjs(data?.cumulative?.[0]?.date).subtract(1, 'day').format('YYYY-MM-DD'),
          pnl: 0,
          hide: true,
        },
        ...data?.cumulative?.map((item: any) => ({
          label: dayjs(item?.date).format('YYYY-MM-DD'),
          pnl: item?.pnl,
        })),
      ]
    : [];

  // Calculate zero offset for gradient
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

  const skiaRef = useRef(null);
  const { registerChart, unregisterChart }: any = useECharts();
  const [chartInstance, setChartInstance] = useState(null as any);

  useEffect(() => {
    const currentChart = registerChart(chartId, skiaRef.current, width, 400);
    setChartInstance(currentChart);

    return () => {
      if (currentChart) {
        unregisterChart(chartId);
      }
    };
  }, [chartId]);

  const tooltip = useMemo(
    () => ({
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
      snap: true,
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
    }),
    []
  );
  const title = useMemo(
    () => ({
      left: 'center',
      text: '',
    }),
    []
  );

  const xAxis = useMemo(
    () => ({
      type: 'category',
      boundaryGap: false,
      data: graphData?.map((item) => item?.label),
      axisLabel: {
        rotate: -70,
        formatter: function (value: any, index: any) {
          return dayjs(value).format('YYYY-MM-DD');
        },
        fontSize: 8,
        fontFamily: theme.font.poppinsMedium,
      },
      axisTick: {
        show: false, // Hide the small lines on the x-axis
      },
    }),
    [graphData]
  );
  const yAxis = useMemo(
    () => ({
      type: 'value',
      // boundaryGap: [0, '100%'],
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
    }),
    []
  );
  const series = useMemo(
    () => [
      {
        animationDuration: 1000,
        animationEasing: 'sinusoidalIn', // Easing for initial data
        name: 'Cumulative P&L',
        type: 'line',
        symbol: 'none',
        // sampling: 'lttb',
        data: graphData?.map((item) => item.pnl),
        //Smooth edges
        smooth: true,
        itemStyle: {
          color: '#131B24',
        },
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
                color: 'rgba(0, 255, 0, 0.1)', // More transparent green at top
              },
              {
                offset: (zeroOffset - 0.01) * 0.5,
                color: 'rgba(0, 255, 0, 0.5)', // More transparent green at top
              },
              {
                offset: zeroOffset,
                color: 'rgba(0, 255, 0, 0.9)', // More transparent green at zero offset
              },
              {
                offset: zeroOffset,
                color: 'rgba(255, 0, 0, 0.9)', // More transparent red at zero offset
              },
              {
                offset: 1,
                color: 'rgba(255, 0, 0, 0.1])', // More transparent red at bottom
              },
            ],
          },
        },
        // Set the color of the line itself
        lineStyle: {
          width: 2,
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
    [graphData, zeroOffset]
  );

  const option = useMemo(() => {
    return {
      title,
      tooltip,
      xAxis,
      yAxis,
      series,
    };
  }, [title, tooltip, xAxis, yAxis, series]);
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
  return <SkiaChart ref={skiaRef} />;
}
