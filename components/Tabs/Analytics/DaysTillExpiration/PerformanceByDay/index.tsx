/* eslint-disable import/order */
import _ from 'lodash';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { SkiaChart } from '@wuba/react-native-echarts';
import { width } from '~/constants/Colors';
import { toCurrency } from '~/utils/helper.utils';
import theme from '~/utils/theme';
import { useECharts } from '~/context/ChartContext';
import { View } from 'react-native';
import { DefaultText as Text } from '~/components/common/DefaultText';
import { useReport } from '~/context/ReportContext';
import * as echarts from 'echarts/core';
import { useQuery } from '~/context/QueryContext';
import NoData from '~/components/common/NoData';

export default function PerformanceByDay({ chartId }: any) {
  const { chartReport, loadingScreens }: any = useReport();
  const { selectedDateText }: any = useQuery();

  const dataAxis = useMemo(
    () => chartReport?.daysTillExpiration?.map((item: any) => item.range),
    [chartReport]
  );
  const skiaRef = useRef(null);
  const { registerChart, unregisterChart }: any = useECharts();
  const [chartInstance, setChartInstance] = useState(null as any);

  useEffect(() => {
    if (!chartId || chartReport?.daysTillExpiration?.length === 0 || loadingScreens === 'days')
      return;
    const currentChart = registerChart(chartId, skiaRef.current, width, 400);
    setChartInstance(currentChart);

    return () => {
      if (
        currentChart &&
        (chartReport?.daysTillExpiration?.length === 0 || loadingScreens === 'days')
      ) {
        unregisterChart(chartId);
      }
    };
  }, [chartId, chartReport?.daysTillExpiration?.length, loadingScreens]);

  const title = useMemo(
    () => ({
      text: '',
      subtext: '',
      left: 'center',
      textStyle: {
        color: '#000',
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
      borderColor: theme.colors.dashboard_card_text,
      formatter: (params: any) => {
        const param = params[0];
        return `Day: ${param.name}\nPnl: ${toCurrency(param.value)}`;
      },
      padding: [10, 10],
      backgroundColor: theme.colors.dashboard_card,
      textStyle: {
        fontSize: 14,
        lineHeight: 14,
        margin: 0,
        padding: 0,
        color: '#fff',
      },
    }),
    []
  );

  const xAxis = useMemo(
    () => ({
      data: dataAxis,
      axisLabel: {
        rotate: 0,
        formatter(value: any, index: any) {
          return value;
        },
        fontSize: 9,
        color: 'white',
        fontFamily: theme.font.poppinsMedium,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    }),
    [dataAxis]
  );

  const yAxis = useMemo(
    () => ({
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
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
    }),
    []
  );

  const grid = useMemo(
    () => ({
      left: '4%',
      right: '10%',
      bottom: '5%',
      top: '10%',
      containLabel: true,
    }),
    []
  );

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
        data: chartReport?.daysTillExpiration?.map((value: any) => ({
          value: value?.pnl,
          itemStyle: {
            borderRadius: 3,
            color:
              value?.pnl >= 0
                ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#00c853' }, // Lighter green at top
                    { offset: 1, color: '#0080014B' }, // Darker green at bottom
                  ])
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#d500004B' }, // Lighter red at top
                    { offset: 1, color: '#FF0000' }, // Darker red at bottom
                  ]),
          },
          emphasis: {
            itemStyle: {
              color:
                value?.pnl >= 0
                  ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'white' },
                      { offset: 0.7, color: '#22DD22' },
                      { offset: 1, color: 'green' },
                    ])
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'white' },
                      { offset: 0.7, color: 'red' },
                      { offset: 1, color: 'red' },
                    ]),
            },
          },
        })),
        // showBackground: true,
        animationDelay(idx: any) {
          return idx * 10;
        },
      },
    ],
    [chartReport]
  );

  const option = useMemo(
    () => ({
      title,
      tooltip,
      xAxis,
      yAxis,
      grid,
      series,
    }),
    [title, tooltip, xAxis, yAxis, grid, series]
  );
  useEffect(() => {
    if (
      !chartInstance ||
      chartReport?.daysTillExpiration?.length === 0 ||
      loadingScreens === 'days'
    )
      return;

    const setOptionWhenReady = () => {
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.setOption(option);
      }
    };
    requestAnimationFrame(setOptionWhenReady);
  }, [chartInstance, chartReport?.daysTillExpiration?.length, option, loadingScreens]);

  // Enable data zoom when user click bar.
  useEffect(() => {
    if (!chartInstance || !chartReport?.daysTillExpiration?.length || loadingScreens === 'days')
      return;

    const zoomSize = 6;
    const clickHandler = (params: any) => {
      chartInstance.dispatchAction({
        type: 'dataZoom',
        startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
        endValue:
          dataAxis[
            Math.min(params.dataIndex + zoomSize / 2, chartReport?.daysTillExpiration?.length - 1)
          ],
      });
    };

    chartInstance.on('click', clickHandler);

    return () => {
      chartInstance.off('click', clickHandler);
    };
  }, [chartInstance, dataAxis, chartReport?.daysTillExpiration?.length]);

  return (
    <View className=" flex flex-col  rounded-lg bg-white dark:bg-dashboard_card">
      <View className="px-7 pt-4">
        <Text className="font-poppinsMedium text-lg dark:text-white ">
          PERFORMANCE BY DAYS TILL EXPIRATION
        </Text>
        {selectedDateText}
      </View>
      {chartReport?.daysTillExpiration?.length ? <SkiaChart ref={skiaRef} /> : <NoData />}
    </View>
  );
}
