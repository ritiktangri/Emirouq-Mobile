/* eslint-disable import/order */
import React, { useState, createContext, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  DataZoomInsideComponent,
} from 'echarts/components';
import { SkiaRenderer } from '@wuba/react-native-echarts';
import { useDashboard } from './DashboardContext';

echarts.use([
  SkiaRenderer,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  LineChart,
  BarChart,
  DataZoomComponent,
  DataZoomInsideComponent,
]);

// ECharts Context
const EChartsContext = createContext(null);
export const useECharts = () => React.useContext(EChartsContext);
// ECharts Provider Component
export const EChartsProvider = ({ children }: any) => {
  const { loading } = useDashboard();
  const [chartInstances, setChartInstances] = useState({} as any);
  const registerChart = (id: any, chartRef: any, width: any, height: any) => {
    let chart: any;
    if (chartRef) {
      chart = echarts.init(chartRef, 'light', {
        renderer: 'svg',
        width,
        height,
      });
      setChartInstances((prev: any) => ({ ...prev, [id]: chart }));
    }
    return chart;
  };
  const unregisterChart = (id: any) => {
    setChartInstances((prev: any) => {
      const updated = { ...prev };
      if (updated[id]) {
        updated[id].dispose(); // Dispose the chart instance
        delete updated[id]; // Remove from state
      }
      return updated;
    });
  };

  useEffect(() => {
    if (loading) {
      // clearing the charts when loading is true
      Object.values(chartInstances).forEach((chart: any) => {
        chart.clear();
      });
    }
  }, [loading]);
  const hideTooltip = () => {
    Object.values(chartInstances).forEach((chart: any) => {
      chart.dispatchAction({
        type: 'hideTip',
      });
    });
  };

  const getChartInstance = (id: any) => chartInstances[id];

  const value: any = {
    registerChart,
    unregisterChart,
    getChartInstance,
    hideTooltip,
    chartInstances,
  };

  return <EChartsContext.Provider value={value}>{children}</EChartsContext.Provider>;
};
