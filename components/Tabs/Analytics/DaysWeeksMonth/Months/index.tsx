/* eslint-disable prettier/prettier */
import React from 'react';
import { FlatList } from 'react-native';

import DistributionChart from './DistributionChart';
import PerformanceByDay from './PerformanceByDay';
import Loading from '../../Loading';
import Table from '../../Table';

import { useReport } from '~/context/ReportContext';

const Days = () => {
  const { loadingScreens, chartReport }: any = useReport();
  const components = [
    <DistributionChart chartId="month_distribution" />,
    <PerformanceByDay chartId="month_performance" />,
    <Table type="month" label="Month" data={chartReport?.months} />,
  ];
  return (
    <FlatList
      data={loadingScreens === 'months' ? [<Loading id="chart" />] : components}
      contentContainerClassName="mx-4  gap-y-4 mt-2"
      renderItem={({ item }) => item}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Days;
