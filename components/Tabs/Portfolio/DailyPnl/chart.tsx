/* eslint-disable import/order */
import _ from 'lodash';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as echarts from 'echarts/core';
import { SkiaChart } from '@wuba/react-native-echarts';
import { width } from '~/constants/Colors';
import { toCurrency } from '~/utils/helper.utils';
import dayjs from 'dayjs';
import theme from '~/utils/theme';
import { useECharts } from '~/context/ChartContext';
import { useDashboard } from '~/context/DashboardContext';

export default function Chart({ chartId }: any) {
  const { data } = useDashboard();
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

  const title = useMemo(
    () => ({
      text: '',
      left: 'center',
      textStyle: {
        color: '#fff',
      },
    }),
    []
  );

  const tooltip = useMemo(
    () => ({
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
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
  const XAxiData = data?.dailyStats?.data?.map((item: any) => item._id);
  const xAxis = useMemo(
    () => ({
      data: XAxiData,
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false, // Hide the small lines on the x-axis
      },
      axisLabel: {
        //Adjust the margin
        margin: 10,
        rotate: -70,
        formatter(value: any, index: any) {
          return dayjs(value).format('YYYY-MM-DD');
        },
        fontSize: 8,
        fontFamily: theme.font.poppinsMedium,
      },
      // boundaryGap: ['20%', '20%'],
    }),
    [XAxiData]
  );
  const yAxis = useMemo(
    () => ({
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: (value: any) => {
          if (Math.abs(value) >= 1000) {
            return `$${_.round(value / 1000, 3)}K`;
          }
          return `$${value}`;
        },
        // margin: 15,
        fontSize: 10,
        fontFamily: theme.font.poppinsMedium,
      },
      type: 'value',
      // boundaryGap: [0, '10%'],
    }),
    []
  );
  const grid = useMemo(
    () => ({
      // Adjust the grid to make room for the labels
      left: '4%',
      right: '10%',
      bottom: '5%', // Restore original bottom value
      top: '10%',
      containLabel: true, // Add this line
    }),
    []
  );
  const pnl = data?.dailyStats?.data?.map((item: any) => item.totalPnl);
  const series = useMemo(
    () => [
      {
        animation: false, // Enable initial animation
        animationDuration: 500, // Reduce duration
        animationEasing: 'linear',
        // animationDelay: 0,
        // animationUpdate: true, // Disable animation on updates
        // animationDurationUpdate: 0,
        // animationDelayUpdate: 0,
        name: 'pnl', // Matches the legend data
        type: 'bar',
        data: pnl?.map((value: any) => ({
          value,
          itemStyle: {
            // borderRadius: 3,
            color:
              value >= 0
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#00c853' }, // Lighter green at top
                    { offset: 1, color: '#0080014B' }, // Darker green at bottom
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#d500004B' }, // Lighter red at top
                    { offset: 1, color: '#FF0000' }, // Darker red at bottom
                  ]),
          },
        })),
        // showBackground: true,
        animationDelay(idx: any) {
          return idx * 10;
        },
      },
    ],
    [pnl]
  );
  const option = useMemo(
    () => ({
      title,
      tooltip,
      xAxis,
      yAxis,
      grid,
      series,
      animationEasing: 'elasticOut',
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      animationDelayUpdate(idx: any) {
        return idx * 5;
      },
    }),
    [title, tooltip, xAxis, yAxis, grid]
  );

  useEffect(() => {
    if (!chartInstance || !data) return;

    const setOptionWhenReady = () => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.setOption(option);
      }
    };

    // Use requestAnimationFrame for a more reliable delay
    requestAnimationFrame(setOptionWhenReady);
  }, [chartInstance, data, option]);
  return <SkiaChart ref={skiaRef} />;
}
